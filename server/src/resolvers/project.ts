import { Project } from "../entities/Project";
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
import { isAuth } from "../middleware/isAuth";
import { User_Project } from "../entities/User_Project";
import { MyContext } from "../types";
import { myDataSource } from "../data-source";
import { CHART_STATUS } from "../constants";
import { Users } from "../entities/Users";

@ObjectType()
class ProjectByPriority {
  @Field()
  low: string;

  @Field()
  medium: string;

  @Field()
  high: string;

  @Field()
  immediate: string;
}

@ObjectType()
class ProjectByType {
  @Field()
  issue: string;

  @Field()
  bug: string;

  @Field()
  feature: string;
}

@ObjectType()
class ProjectByStatus {
  @Field()
  new: string;

  @Field()
  in_progress: string;

  @Field()
  resolved: string;
}

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

  @Field()
  type!: string;

  @Field()
  priority!: string;
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

  @Query(() => [ProjectByPriority])
  async projectByPriority(
    @Ctx() { req }: MyContext
  ): Promise<ProjectByPriority[]> {
    return await myDataSource.query(`
    select
      count(*)
        filter (where "p".priority = 'low') as low,
      count(*)
        filter (where "p".priority = 'medium') as medium,
      count(*)
        filter (where "p".priority = 'high') as high,
      count(*)
        filter (where "p".priority = 'immediate') as "immediate"
    from 
      user_project up inner join project p on p.id = up."projectId" where up."userId" = ${req.session.userId}
    `);
  }

  @Query(() => [ProjectByType])
  async projectByType(@Ctx() { req }: MyContext): Promise<ProjectByType[]> {
    return await myDataSource.query(`
    select
      count(*)
        filter (where "p".type = 'issue') as issue,
      count(*)
        filter (where "p".type = 'bug') as bug,
      count(*)
        filter (where "p".type = 'feature') as feature
    from 
      user_project up inner join project p on p.id = up."projectId" where up."userId" = ${req.session.userId}
    `);
  }

  @Query(() => [ProjectByStatus])
  async projectByStatus(@Ctx() { req }: MyContext): Promise<ProjectByStatus[]> {
    return await myDataSource.query(`
    select
      count(*)
        filter (where "p".status = 'new') as new,
      count(*)
        filter (where "p".status = 'in_progress') as in_progress,
      count(*)
        filter (where "p".status = 'resolved') as resolved
    from 
      user_project up inner join project p on p.id = up."projectId" where up."userId" = ${req.session.userId}
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

  @Mutation(() => Project)
  @UseMiddleware(isAuth)
  // add middleware so only admin or
  async createProject(
    @Arg("options") options: CreateProjectInput,
    @Ctx() { req }: MyContext
  ): Promise<Project> {
    const { name, description, type, priority } = options;
    if (!name || !description || !type || !priority) {
      throw new Error("invalid input");
    }
    const createdProject = await Project.create({
      description,
      name,
      type,
      priority,
      status: CHART_STATUS.NEW,
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
