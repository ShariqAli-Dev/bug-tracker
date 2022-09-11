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
  async userComments(@Ctx() { req }: MyContext): Promise<Comment[]> {
    return await Comment.find({ where: { userId: req.session.userId } });
  }

  @Mutation(() => Comment)
  async createComment(
    @Arg("options") options: createComment,
    @Ctx() { req }: MyContext
  ): Promise<Comment> {
    return await Comment.create({
      message: options.message,
      userId: req.session.userId,
      ticketId: options.ticketId,
    }).save();
  }
}
