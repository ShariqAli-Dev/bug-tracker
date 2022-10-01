import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Ticket } from "../entities/Ticket";
import { User_Ticket } from "../entities/User_Ticket";

@InputType()
class userTickets {
  @Field()
  projectId!: number;
}

@InputType()
class createTicketInput extends userTickets {
  @Field()
  projectId: number;

  @Field()
  creator!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  priority!: string;

  @Field()
  type!: string;

  @Field()
  status!: string;
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
  async userTickets(@Arg("options") options: userTickets): Promise<Ticket[]> {
    return await Ticket.find({ where: { projectId: options.projectId } });
  }

  @Mutation(() => Ticket)
  async createTicket(
    @Arg("options") options: createTicketInput,
    @Arg("team", () => [teamMembers]) team: teamMembers[]
  ): Promise<Ticket> {
    console.log("you got this far");
    const ticket = await Ticket.create({ ...options }).save();

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

    return ticket;
  }
}
