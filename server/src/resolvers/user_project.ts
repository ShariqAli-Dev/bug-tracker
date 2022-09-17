import { User_Project } from "../entities/User_Project";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { myDataSource } from "../data-source";

@Resolver()
export class UserProjectResolver {
  @Query(() => [User_Project])
  async UserProjects(@Ctx() { req }: MyContext): Promise<User_Project[]> {
    return await myDataSource.query(`
    select up.*,
    json_build_object(
      'id', p.id,
      'name', p.name,
      'description', p.description,
      'createdAt', p."createdAt",
      'updatedAt', p."updatedAt"
    ) project
    from user_project up
    inner join project p on p.id = up."projectId" where up."userId" = ${req.session.userId}
    `);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth) // another middleware so only admin and project manager can create a project or un assign users from projects
  async assignUser(
    @Arg("projectId") projectId: number,
    @Ctx() { req }: MyContext
  ) {
    await User_Project.insert({
      projectId,
      userId: req.session.userId,
    });
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async unassignUser(
    @Arg("projectId") projectId: number,
    @Ctx() { req }: MyContext
  ) {
    await User_Project.delete({ projectId, userId: req.session.userId });

    return true;
  }
}
