import { Comment } from "../entities/Comment";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "src/types";
import { myDataSource } from "../data-source";
@InputType()
class createComment {
  @Field()
  ticketId!: number;

  @Field()
  message!: string;
}

@Resolver()
export class CommentResolver {
  @Query(() => [Comment])
  async comments(): Promise<Comment[]> {
    return await Comment.find();
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
