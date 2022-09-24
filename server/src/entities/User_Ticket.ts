import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Ticket } from "./Ticket";
import { Users } from "./Users";

@ObjectType()
@Entity()
export class User_Ticket extends BaseEntity {
  @Field()
  @PrimaryColumn({ type: "int" })
  ticketId: number;

  @Field()
  @PrimaryColumn({ type: "int" })
  userId: number;

  @Field(() => Ticket)
  @ManyToOne(() => Ticket, (ticket) => ticket.user_ticket)
  ticket: Ticket;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.user_ticket)
  user: Users;
}
