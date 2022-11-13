import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { v4 } from "uuid";
import {
  COOKIE_NAME,
  FORGET_PASSWORD_PREFIX,
  INITIAL_ROLE,
} from "../constants";
import { myDataSource } from "../data-source";
import { Users } from "../entities/Users";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { sendMail } from "../utils/sendMail";
import { Comment } from "../entities/Comment";
import { User_Ticket } from "../entities/User_Ticket";
import { User_Project } from "../entities/User_Project";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@InputType()
class UserLogin {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
class UserRegister extends UserLogin {
  @Field()
  name: string;
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
  @Query(() => [Users])
  async users() {
    return await Users.find();
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

  @Mutation(() => Boolean)
  async changeRole(
    @Ctx() { req }: MyContext,
    @Arg("role") role: string
  ): Promise<boolean> {
    const user = await Users.findOne({ where: { id: req.session.userId } });
    if (!user) {
      return false;
    }
    await Users.update({ id: req.session.userId }, { role });
    return true;
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

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserRegister,
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
    if (options.name.length <= 2) {
      return {
        errors: [
          {
            field: "name",
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
          name: options.name,
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
    @Arg("options") options: UserLogin,
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

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: number): Promise<boolean> {
    const user = await Users.findOne({ where: { id } });
    if (!user) {
      return false;
    }
    Comment.query(`
    delete from "comment"
    where "comment"."userId" = ${id}
    `);

    await User_Ticket.query(`
    delete from user_ticket
    where user_ticket."userId" = ${id}
    `);

    await User_Project.query(`
    delete from user_project
    where user_project."userId" = ${id}
    `);

    Users.delete(id);

    return true;
  }
}
