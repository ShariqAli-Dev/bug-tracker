import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { v4 } from "uuid";
import {
  FORGET_PASSWORD_PREFIX,
  COOKIE_NAME,
  INITIAL_ROLE,
} from "../constants";
import { myDataSource } from "../data-source";
import { Users } from "../entities/Users";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { sendMail } from "../utils/sendMail";

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
}

@Resolver(Users)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: Users, @Ctx() { req }: MyContext) {
    // this is the current user and it's okay to show them their own email
    if (req.session.userId === user.id) {
      return user.email;
    }

    // current user wants to see someone else's email
    return "";
  }

  @Query(() => Users, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }

    return Users.findOne({
      where: { id: req.session.userId },
    });
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye() {
    return "bye!";
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req, redis }: MyContext
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
    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "token expired",
          },
        ],
      };
    }

    const user = await Users.findOne({ where: { id: parseInt(userId) } });

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user no longer exists",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(newPassword);
    user.password = hashedPassword;
    await Users.update({ id: parseInt(userId) }, { password: hashedPassword });
    await redis.del(key);

    // log in user after change password
    req.session.userId = user.id;
    req.session.role = user.role;
    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return true;
    }

    const token = v4();

    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "EX",
      1000 * 60 * 60 * 24 * 3 // 3 days
    );

    await sendMail(
      email,
      `<a href='http://localhost:3000/forgot-password/${token}'>reset password</a>`
    );
    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(@Arg("id", () => Int) id: number) {
    const user = await Users.findOne({ where: { id } });
    if (user) {
      Users.update({ id }, { tokenVersion: user.tokenVersion + 1 });
    }

    return true;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserInput,
    @Ctx() { req }: MyContext
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
      // UserInput.create({}).save()
      const result = await myDataSource
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values({
          id: 200,
          email: options.email,
          password: hashedPassword,
          role: INITIAL_ROLE,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
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
    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userId = user.id;
    req.session.role = user.role;
    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UserInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await Users.findOne({
      where: { email: options.email },
    });

    if (!user) {
      return {
        errors: [{ field: "email", message: "that email doesn't exist" }],
      };
    }

    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return { errors: [{ field: "password", message: "incorrect password" }] };
    }

    req.session.userId = user.id;
    req.session.role = user.role;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
