import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Notification } from "./Notification";
import { User_Project } from "./User_Project";
import { Comment } from "./Comment";
import { User_Ticket } from "./User_Ticket";

@ObjectType()
@Entity()
export class Users extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  role!: string;

  @Field()
  @Column()
  name!: string;

  @Column()
  password!: string;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => User_Project, (user_project) => user_project.user)
  user_project: User_Project[];

  @OneToMany(() => User_Ticket, (user_ticket) => user_ticket.user)
  user_ticket: User_Ticket[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
