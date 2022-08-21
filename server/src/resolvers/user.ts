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
import { __initialRole__, __accessTokenSecret__ } from "../constants";
import argon2 from "argon2";
import { buildAccessToken, buildRefreshToken } from "../utils/buildToken";
import jwt from "jsonwebtoken";
import { EntityManager } from "@mikro-orm/postgresql";
import { isAuth } from "./userMiddleware";
import { sendRefreshToken } from "../utils/sendToken";
import { wrap } from "@mikro-orm/core";

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

  // @Field(() => Users, { nullable: true })
  // user?: Users;

  @Field(() => String, { nullable: true })
  accessToken?: string;
}

@Resolver()
export class UserResolver {
  @Query(() => UserResponse, { nullable: true })
  async me(@Arg("accessToken") accessToken: string, @Ctx() { em }: MyContext) {
    jwt.verify(
      accessToken,
      __accessTokenSecret__,
      async (err, decoded: any) => {
        if (err) return null;
        return await em.findOne(Users, { id: decoded.token });
      }
    );
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye() {
    return "bye!";
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(
    @Arg("userId", () => Int) userId: number,
    @Ctx() { em }: MyContext
  ) {
    const user = await em.findOneOrFail(Users, { id: userId });
    wrap(user).assign({
      tokenVersion: user.tokenVersion + 1,
    });

    return true;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserInput,
    @Ctx() { em, res }: MyContext
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
      const result = await (em as EntityManager)
        .createQueryBuilder(Users)
        .getKnexQuery()
        .insert({
          email: options.email,
          password: hashedPassword,
          role: __initialRole__,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning("*");
      user = result[0];
    } catch (err) {
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
    @Ctx() { em, res }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(Users, { email: options.email });
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
