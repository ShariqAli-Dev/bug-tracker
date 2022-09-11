import { Ticket } from "../entities/Ticket";
import { Arg, Field, InputType, Query, Resolver } from "type-graphql";

@InputType()
class userTickets {
  @Field()
  projectId!: number;
}

@InputType()
class createTicketInput extends userTickets {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  submitter!: string;

  @Field()
  developer!: string;

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

  @Query(() => Ticket)
  async createTicket(
    @Arg("options") options: createTicketInput
  ): Promise<Ticket> {
    return await Ticket.create({
      title: options.title,
      description: options.description,
      submitter: options.submitter,
      developer: options.developer,
      priority: options.priority,
      type: options.type,
      status: options.status,
      projectId: options.projectId,
    }).save();
  }
}
