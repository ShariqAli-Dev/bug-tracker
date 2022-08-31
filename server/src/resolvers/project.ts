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
  async createProject(
    @Arg("description") description: string,
    @Arg("name") name: string
  ): Promise<Project> {
    if (!name || !description) {
      throw new Error("invalid input");
    }

    return await Project.create({
      description,
      name,
    }).save();
  }

  @Mutation(() => Project, { nullable: true })
  async updateProject(
    @Arg("options") options: { id: number; name: string; description: string }
  ): Promise<Project | null> {
    const { id, name, description } = options;
    const project = await Project.findOne({ where: { id } });
    if (!project) return null;

    if (
      typeof id !== "undefined" &&
      typeof name !== "undefined" &&
      typeof description !== "undefined"
    ) {
      Project.update({ id }, { name, description });
    }

    return project;
  }
}
