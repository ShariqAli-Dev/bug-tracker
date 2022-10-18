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
    return await Ticket.find({ where: { projectId } });
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
  async updateTicket(
    @Arg("options") options: editTicketInput
  ): Promise<Ticket | null> {
    const { id, ...ticketData } = options;
    const ticket = await Ticket.findOne({ where: { id } });

    if (!ticket) {
      return null;
    }

    await Ticket.update({ id }, { ...ticketData });
    return ticket;
  }
}
