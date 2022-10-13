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
import { myDataSource } from "../data-source";
import { Comment } from "../entities/Comment";
import { Users } from "../entities/Users";
import { MyContext } from "../types";
@InputType()
class createComment {
  @Field()
  ticketId!: number;

  @Field()
  message!: string;
}

@ObjectType()
class TicketComment {
  @Field()
  id: number;

  @Field()
  message: string;

  @Field()
  createdAt: Date;

  @Field()
  user: Users;
}

@Resolver()
export class CommentResolver {
  @Query(() => [Comment])
  async comments(): Promise<Comment[]> {
    return await Comment.find();
  }

  @Query(() => [TicketComment])
  async ticketComments(
    @Arg("ticketId") ticketId: number
  ): Promise<TicketComment[]> {
    return await myDataSource.query(
      `select "c".*,
        json_build_object(
          'id', u.id,
          'name', u.name,
          'createdAt', u."createdAt"
        ) "user"
      from "comment" "c"
      inner join users u on u.id = "c"."userId"
      where c."ticketId" = ${ticketId}`
    );
  }

  @Mutation(() => Boolean)
  async createComment(
    @Arg("options") options: createComment,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    try {
      await Comment.create({
        message: options.message,
        userId: req.session.userId || 1,
        ticketId: options.ticketId,
      }).save();
      return true;
    } catch {
      return false;
    }
  }
}
