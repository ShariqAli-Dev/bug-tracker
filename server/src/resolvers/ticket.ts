import { Ticket } from "../entities/Ticket";
import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

@InputType()
class userTickets {
  @Field()
  projectId!: number;
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
    console.log({ options, team });
    const ticket = await Ticket.create({
      projectId: options.projectId,
      creator: options.creator,
      title: options.title,
      description: options.description,
      priority: options.priority,
      type: options.type,
      status: options.status,
    }).save();

    return ticket;
  }
}
