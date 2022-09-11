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

@Resolver()
export class UserProjectResolver {
  @Query(() => [User_Project])
  @UseMiddleware(isAuth)
  async UserProjects(@Ctx() { req }: MyContext): Promise<User_Project[]> {
    return await User_Project.find({
      where: { userId: req.session.userId },
    });
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