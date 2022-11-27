import { Users } from "../entities/Users";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Comment } from "../entities/Comment";
import { Project } from "../entities/Project";
import { Ticket } from "../entities/Ticket";
import { User_Project } from "../entities/User_Project";
import { User_Ticket } from "../entities/User_Ticket";
import { MyContext } from "../types";

@InputType()
class CreateProjectInput {
  @Field()
  name!: string;

  @Field()
  description!: string;
}

@InputType()
class UpdateProjectInput extends CreateProjectInput {
  @Field()
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

    const adminUsers = await Users.find({ where: { role: "admin" } });
    adminUsers.forEach(async ({ id }) => {
      await User_Project.create({
        userId: id,
        projectId: createdProject.id,
      }).save();
    });

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
      project &&
      typeof name !== "undefined" &&
      typeof description !== "undefined"
    ) {
      await Project.update({ id }, { name, description });
    }

    return project;
  }

  @Mutation(() => Boolean)
  async archiveProject(@Arg("id") id: number) {
    const project = await Project.findOne({ where: { id } });
    if (!project) {
      return false;
    }
    await Project.update({ id }, { archived: !project.archived });

    return true;
  }

  @Mutation(() => Boolean)
  async deleteProject(@Arg("projectId") projectId: number) {
    // delete commments
    await Comment.query(`
    delete from "comment"
    where "comment"."ticketId" in 
      (
      select "id" from ticket
      where "ticket"."projectId" = ${projectId}
      )
    `);
    // delete user_ticket
    await User_Ticket.query(`
    delete from user_ticket
    where user_ticket."ticketId" in
      (
        select "id" from ticket
        where ticket."projectId" = ${projectId}
      )
    `);
    // delete tickets
    await Ticket.query(`
    delete from ticket
    where ticket."projectId" = ${projectId}
    `);
    // delete assignedDevelopers
    await User_Project.query(`
    delete from user_project
    where user_project."projectId" = ${projectId}
    `);
    // delete project
    await Project.delete(projectId);
    return true;
  }
}
