import { Project } from "../entities/Project";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class ProjectResolver {
  @Query(() => [Project])
  async projects(): Promise<Project[]> {
    return await Project.find();
  }

  @Query(() => Project, { nullable: true })
  async project(@Arg("id") id: number): Promise<Project | null> {
    return await Project.findOne({ where: { id } });
  }

  @Mutation(() => Project)
  async createProject() // description // name
  //
  {
    return {};
  }
}
