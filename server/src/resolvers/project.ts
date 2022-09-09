import { Project } from "../entities/Project";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";

@InputType()
class ProjectInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  name!: string;

  @Field()
  description!: string;
}

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
  @UseMiddleware(isAuth)
  // add middleware so only admin or
  async createProject(@Arg("options") options: ProjectInput): Promise<Project> {
    const { name, description } = options;
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
    @Arg("options") options: ProjectInput
  ): Promise<Project | null> {
    const { id, name, description } = options;
    const project = await Project.findOne({ where: { id } });
    if (!project) return null;

    if (
      typeof id !== "undefined" &&
      typeof name !== "undefined" &&
      typeof description !== "undefined"
    ) {
      await Project.update({ id }, { name, description });
    }

    return project;
  }

  @Mutation(() => Boolean)
  async deleteProject(@Arg("id") id: number) {
    await Project.delete(id);
    return true;
  }
}
