import { Users } from "../entities/Users";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { __initialRole__, __accessTokenSecret__ } from "../constants";
import argon2 from "argon2";
import { buildAccessToken, buildRefreshToken } from "../utils/buildToken";
import jwt from "jsonwebtoken";
import { EntityManager } from "@mikro-orm/postgresql";

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
  token?: string;
}

@Resolver()
export class UserResolver {
  @Query(() => UserResponse, { nullable: true })
  async me(@Arg("token") token: string, @Ctx() { em }: MyContext) {
    jwt.verify(token, __accessTokenSecret__, async (err, decoded: any) => {
      if (err) return null;
      return await em.findOne(Users, { id: decoded.token });
    });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserInput,
    @Ctx() { em }: MyContext
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

    return {
      token: buildAccessToken(user, { expiresIn: "15m" }),
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

    res.cookie("joemamanuts", buildRefreshToken(user, { expiresIn: "7d" }), {
      httpOnly: true,
    });

    return {
      token: buildAccessToken(user, { expiresIn: "15m" }),
    };
  }
}
