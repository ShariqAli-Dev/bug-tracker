import { Ticket } from "../entities/Ticket";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class userTickets {
  @Field()
  projectId!: number;
}

@InputType()
class createTicketInput extends userTickets {
  @Field()
  projectId!: number;

  @Field()
  creator!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  time!: number;

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
    @Arg("options") options: createTicketInput
  ): Promise<Ticket> {
    return await Ticket.create({
      projectId: options.projectId,
      title: options.title,
      description: options.description,
      time: options.time,
      priority: options.priority,
      type: options.type,
      status: options.status,
    }).save();
  }
}
