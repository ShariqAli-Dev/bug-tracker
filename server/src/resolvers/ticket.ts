import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Ticket } from "../entities/Ticket";
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

@Resolver()
export class TicketResolver {
  @Query(() => [Ticket])
  async tickets(): Promise<Ticket[]> {
    return await Ticket.find();
  }

  @Query(() => [Ticket])
  async projectTickets(@Arg("projectId") projectId: number): Promise<Ticket[]> {
    return await Ticket.find({ where: { projectId } });
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
}
