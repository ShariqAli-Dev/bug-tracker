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

  @Query(() => [Comment])
  async userComments(@Ctx() { req }: MyContext): Promise<Comment[]> {
    const comments = await myDataSource.query(`
    select c.*, 
    json_build_object(
      'id', u.id,
      'email', u.email,
      'role', u.role,
      'tokenVersion', u."tokenVersion",
      'createdAt', u."createdAt",
      'updatedAt', u."updatedAt"
      ) user 
    from comment c

    inner join users u on u.id = c."userId"
    where c."userId" = ${req.session.userId || 1}
    
    order by c."createdAt" DESC
    `);
    return comments;
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
