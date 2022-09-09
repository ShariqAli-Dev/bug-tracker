import { User_Project } from "src/entities/User_Project";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class UserProjectResolver {
  @Query(() => [User_Project])
  @UseMiddleware(isAuth)
  async UserProjects(@Ctx() { req }: MyContext): Promise<User_Project[]> {
    return await User_Project.find({ where: { userId: req.session.userId } });
  }

  @Mutation(() => Boolean)
  async vote() {
    return true;
  }
}
