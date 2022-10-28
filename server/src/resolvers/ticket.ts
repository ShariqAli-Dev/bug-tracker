import { Comment } from "../entities/Comment";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { myDataSource } from "../data-source";
import { Ticket } from "../entities/Ticket";
import { Users } from "../entities/Users";
import { User_Ticket } from "../entities/User_Ticket";

@InputType()
class createTicketInput {
  @Field()
  projectId?: number;

  @Field()
  creator?: string;

  @Field()
  title?: string;

  @Field()
  description?: string;

  @Field()
  priority?: string;

  @Field()
  type?: string;

  @Field()
  status?: string;
}

@InputType()
class editTicketInput {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  type: string;

  @Field()
  priority: string;

  @Field()
  status: string;
}
@InputType()
class deleteDev {
  @Field()
  userId: number;
}

@InputType()
class teamMembers {
  @Field()
  email: string;

  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  selected: boolean;
}

@ObjectType()
class AssignedDeveloper {
  @Field()
  ticketId: number;

  @Field()
  userId: number;

  @Field()
  user: Users;
}

@Resolver()
export class TicketResolver {
  @Query(() => [Ticket])
  async tickets(): Promise<Ticket[]> {
    return await Ticket.find();
  }

  @Query(() => Ticket, { nullable: true })
  async ticket(@Arg("id") id: number): Promise<Ticket | null> {
    return await Ticket.findOne({ where: { id } });
  }

  @Query(() => [Ticket])
  async projectTickets(@Arg("projectId") projectId: number): Promise<Ticket[]> {
    return await Ticket.find({
      where: { projectId, archived: false },
      order: { createdAt: "ASC" },
    });
  }

  @Query(() => [Ticket])
  async archivedProjectTickets(
    @Arg("projectId") projectId: number
  ): Promise<Ticket[]> {
    return await Ticket.find({
      where: { projectId, archived: true },
      order: { createdAt: "ASC" },
    });
  }

  @Query(() => [AssignedDeveloper])
  async assignedDevelopers(
    @Arg("ticketId") ticketId: number
  ): Promise<AssignedDeveloper> {
    return await myDataSource.query(`
    select ut.*,
    json_build_object(
	  'id', u.id,
	  'name', u.name
    )   "user"
    from user_ticket ut
    inner join users u on u.id = ut."userId"
    where ut."ticketId" = ${ticketId}
    `);
  }

  @Mutation(() => Ticket)
  async createTicket(
    @Arg("options") options: createTicketInput,
    @Arg("team", () => [teamMembers]) team: teamMembers[]
  ): Promise<Ticket> {
    const ticket = await Ticket.create({ ...options }).save();
    if (team.length) {
      let queryString = "";
      team.forEach((m, mdx) => {
        queryString += `(${ticket.id}, ${m.id})`;
        if (mdx !== team.length - 1) {
          queryString += ",";
        }
      });

      User_Ticket.query(`
      insert into user_ticket
        ("ticketId", "userId")
      values
        ${queryString}
      `);
    }

    return ticket;
  }

  @Mutation(() => Ticket, { nullable: true })
  async archiveTicket(@Arg("id") id: number): Promise<Ticket | undefined> {
    const ticket = await Ticket.findOne({ where: { id } });

    if (!ticket) {
      return undefined;
    }

    await Ticket.update({ id }, { archived: !ticket.archived });
    return ticket;
  }

  @Mutation(() => Ticket, { nullable: true })
  async updateTicket(
    @Arg("options") options: editTicketInput,
    @Arg("team", () => [teamMembers]) team: teamMembers[]
  ): Promise<Ticket | null> {
    const { id, ...ticketData } = options;
    const ticket = await Ticket.findOne({ where: { id } });
    if (!ticket) {
      return null;
    }

    interface RequestUserType {
      email: string;
      id: number;
      name: string;
    }

    if (team.length) {
      const insertRequests = [] as RequestUserType[];
      const deleteRequests = [] as RequestUserType[];

      team.forEach(({ selected, ...user }) => {
        if (selected) {
          // if selected == true, then it was previously false. Admin wants to add user to ticket. add user to user_ticket
          insertRequests.push(user);
        } else {
          // if selected was false, then it previously was true. Admin want's to remove user from ticket. remove from user_ticket
          deleteRequests.push(user);
        }
      });

      let insertString = "";
      let deleteString = "";

      insertRequests.forEach((m, mdx) => {
        insertString += `(${ticket.id}, ${m.id})`;
        if (mdx !== team.length - 1) {
          insertString += ",";
        }
      });
      deleteRequests.forEach((m, mdx) => {
        deleteString += `${m.id}`;
        if (mdx !== team.length - 1) {
          deleteString += ",";
        }
      });

      insertString.length &&
        User_Ticket.query(`
      insert into user_ticket
        ("ticketId", "userId")
      values
        ${insertString}
      `);

      deleteString.length &&
        User_Ticket.query(`
      delete from user_ticket
        where
          "ticketId" = ${ticket.id} and
          "userId" in (${deleteString})
      `);
    }

    await Ticket.update({ id }, { ...ticketData });
    return ticket;
  }

  @Mutation(() => Boolean)
  async deleteTicket(
    @Arg("ticketId") ticketId: number,
    @Arg("team", () => [deleteDev], { nullable: true })
    team: deleteDev[]
  ) {
    if (team.length) {
      let deleteString = "";

      team.forEach((m, mdx) => {
        deleteString += `${m.userId}`;
        if (mdx !== team.length - 1) {
          deleteString += ",";
        }
      });

      User_Ticket.query(`
      delete from user_ticket
      where
      "ticketId" = ${ticketId} and
      "userId" in (${deleteString})
      `);
    }
    Comment.query(`
    delete from "comment"
    where "comment"."ticketId" = ${ticketId}
    `);
    await Ticket.delete(ticketId);
    return true;
  }
}
