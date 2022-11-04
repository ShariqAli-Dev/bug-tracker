import { Ticket } from "../entities/Ticket";
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
import { User_Ticket } from "../entities/User_Ticket";
import { Comment } from "../entities/Comment";

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
  async avilableUsers(@Arg("projectId") projectId: number) {
    return await myDataSource.query(`
    select * from users 
	    where "id" not in 
		    (select "userId" from user_project
			    where user_project."projectId" = ${projectId})
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
