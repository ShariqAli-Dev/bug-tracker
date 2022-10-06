import { User_Project } from "../entities/User_Project";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { myDataSource } from "../data-source";

@InputType()
class assignUserInput {
  @Field()
  userId: number;

  @Field()
  projectId: number;
}

@InputType()
class assignTeamInput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}
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
  async assignUsers(
    @Arg("options") options: assignUserInput,
    @Arg("team", () => [assignTeamInput]) team: assignTeamInput[]
  ) {
    if (team.length) {
      let queryString = "";
      team.forEach((m, mdx) => {
        queryString += `${options.projectId}, ${m.id}`;
        if (mdx !== team.length - 1) {
          queryString += ",";
        }
      });
      User_Project.query(`
    insert into user_project
      ("projectId", "userId")
    values
      ${queryString}
    `);
    }

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
