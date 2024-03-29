import { User_Project } from "../entities/User_Project";
import { isAuth } from "../middleware/isAuth";
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
  UseMiddleware,
} from "type-graphql";
import { myDataSource } from "../data-source";
import { Users } from "../entities/Users";

@ObjectType()
class AssignedPersonnel {
  @Field()
  projectId: number;

  @Field()
  userId: number;

  @Field()
  user: Users;
}

@InputType()
class assignTeamInput {
  @Field()
  id?: number;
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

  @Query(() => [AssignedPersonnel])
  async assignedPersonnel(@Arg("projectId") projectId: number) {
    return await myDataSource.query(`
    select up.*,
    json_build_object(
      'id', u.id,
      'role', u.role,
      'email', u.email,
      'name', u.name
    ) "user"
    from user_project up
    inner join users u on u.id = up."userId" where up."projectId" = ${projectId}
    `);
  }

  // this function returns a list of users that are not in the current project
  @Query(() => [Users])
  async availableUsers(
    @Arg("projectId") projectId: number,
    @Arg("isAdding") isAdding: boolean,
    @Ctx() { req }: MyContext
  ) {
    return await myDataSource.query(`
    select * from users 
	    where "id" ${isAdding ? "not" : ""} in 
		    (select "userId" from user_project
			    where user_project."projectId" = ${projectId})
      and "id" ${(req.session.userId as number) < 5 ? "<" : ">="} 5
    `);
  }

  @Mutation(() => Boolean)
  async assignUsers(
    @Arg("projectId") projectId: number,
    @Arg("team", () => [assignTeamInput]) team: assignTeamInput[],
    @Arg("isAdding") isAdding: boolean
  ) {
    if (team.length) {
      if (isAdding) {
        let queryString = "";

        team.forEach((m, mdx) => {
          queryString += `(${projectId}, ${m.id})`;
          if (mdx !== team.length - 1) {
            queryString += ",";
          }
        });

        User_Project.query(`
        insert into user_project
        ("projectId", "userId")
        values ${queryString}
        `);
      } else {
        let queryString = "";

        team.forEach((m, mdx) => {
          queryString += `("projectId" = ${projectId} and "userId" = ${m.id})`;
          if (mdx !== team.length - 1) {
            queryString += " or ";
          }
        });

        User_Project.query(`
        delete from user_project
        where ${queryString}
        `);
      }
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
