import { Users } from "../entities/Users";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  __initialRole__,
  __accessTokenSecret__,
  __passwordResetTokenSecret__,
} from "../constants";
import argon2 from "argon2";
import {
  buildAccessToken,
  buildPasswordResetToken,
  buildRefreshToken,
} from "../utils/buildToken";
import jwt from "jsonwebtoken";
import { isAuth } from "./userMiddleware";
import { sendRefreshToken } from "../utils/sendToken";
import { wrap } from "@mikro-orm/core";
import { sendMail } from "../utils/sendMail";
import { myDataSource } from "../index";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@InputType()
class UserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

// can return from mutations
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Users, { nullable: true })
  user?: Users;

  @Field(() => String, { nullable: true })
  accessToken?: string;
}

@Resolver()
export class UserResolver {
  @Query(() => UserResponse, { nullable: true })
  async me(@Arg("accessToken", () => String) accessToken: string) {
    if (!accessToken) {
      return {
        errors: [
          {
            field: "invalid token",
            message: `token of ${accessToken} is invalid`,
          },
        ],
      };
    }
    const decoded = jwt.verify(accessToken, __accessTokenSecret__) as {
      id: number;
    };
    const user = await Users.findOne({ where: { id: decoded.id } });
    return { user };
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye() {
    return "bye!";
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "length must be greater than 2",
          },
        ],
      };
    }
    const decoded = jwt.verify(token, __passwordResetTokenSecret__) as {
      email: string;
      userId: number;
    };
    if (!decoded) {
      return {
        errors: [{ field: "token", message: "token expired" }],
      };
    }

    const user = await Users.findOne({
      where: { id: decoded.userId },
    });

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user no lognger exists",
          },
        ],
      };
    }
    user.password = await argon2.hash(newPassword);
    Users.update({ id: decoded.userId }, { password: newPassword });

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string) {
    const user = await Users.findOne({ where: { email } });
    if (!user) return true;
    const token = buildPasswordResetToken(email, user.id);

    await sendMail(
      email,
      `<a href='http://localhost:3000/forgot-password/${token}'>reset password</a>`
    );

    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(@Arg("userId", () => Int) userId: number) {
    const user = (await Users.findOne({ where: { id: userId } })) as
      | Users
      | any;
    wrap(user).assign({
      tokenVersion: user.tokenVersion + 1,
    });

    return true;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserInput,
    @Ctx() { res }: MyContext
  ): Promise<UserResponse> {
    if (options.password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 2",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      const result = await myDataSource
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values({
          id: 200,
          email: options.email,
          password: hashedPassword,
          role: __initialRole__,
        })
        .returning("*")
        .execute();
      console.log({ result });
      user = result.raw;
    } catch (err) {
      console.log("-------------------------------------------------");
      console.log({ err });
      console.log("-------------------------------------------------");
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "email",
              message: "email already in use",
            },
          ],
        };
      }
    }
    sendRefreshToken(res, buildRefreshToken(user));
    return {
      accessToken: buildAccessToken(user),
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UserInput,
    @Ctx() { res }: MyContext
  ): Promise<UserResponse> {
    const user = Users.findOne({ where: { email: options.email } }) as any;
    if (!user) {
      return {
        errors: [{ field: "email", message: "that email doesn't exist" }],
      };
    }

    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return { errors: [{ field: "password", message: "incorrect password" }] };
    }
    sendRefreshToken(res, buildRefreshToken(user));
    return {
      accessToken: buildAccessToken(user),
    };
  }
}
