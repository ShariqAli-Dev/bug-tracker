import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "./Users";

@ObjectType()
@Entity()
export class Notification extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int" })
  userId: number;

  @Field()
  @Column()
  message!: string;

  @Field()
  @Column({ type: "boolean", default: false })
  read!: boolean;

  @ManyToOne(() => Users, (user) => user.notifications)
  user: Users;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
