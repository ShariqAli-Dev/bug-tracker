import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { myDataSource } from "../data-source";
import { Project } from "../entities/Project";
import { Users } from "../entities/Users";
import { User_Project } from "../entities/User_Project";
import { MyContext } from "../types";

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
class CreateProjectInput {
  @Field()
  name!: string;

  @Field()
  description!: string;
}

@InputType()
class UpdateProjectInput extends CreateProjectInput {
  @Field({ nullable: true })
  id!: number;
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

  @Mutation(() => Project)
  // add middleware so only admin or
  async createProject(
    @Arg("options") options: CreateProjectInput,
    @Ctx() { req }: MyContext
  ): Promise<Project> {
    const { name, description } = options;
    if (!name || !description) {
      throw new Error("invalid input");
    }
    const createdProject = await Project.create({
      description,
      name,
    }).save();

    await User_Project.create({
      userId: req.session.userId,
      projectId: createdProject.id,
    }).save();

    return createdProject;
  }

  @Mutation(() => Project, { nullable: true })
  async updateProject(
    @Arg("options") options: UpdateProjectInput
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
