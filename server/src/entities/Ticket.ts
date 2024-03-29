import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { Project } from "./Project";
import { User_Ticket } from "./User_Ticket";

@ObjectType()
@Entity()
export class Ticket extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: "int" })
  projectId: number;

  @Field()
  @Column()
  creator: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  priority: string; // low medium high immediate

  @Field()
  @Column()
  type: string; // issue bug feature

  @Field()
  @Column()
  status: string; // new in-progress resolved

  @Field()
  @Column("boolean", { default: false })
  archived: boolean;

  @OneToMany(() => Comment, (comment) => comment.ticket)
  comments: Comment[];

  @OneToMany(() => User_Ticket, (user_ticket) => user_ticket.ticket)
  user_ticket: User_Ticket[];

  @ManyToOne(() => Project, (project) => project.tickets)
  project: Project;

  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
