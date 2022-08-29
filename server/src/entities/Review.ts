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
export class Review extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  review!: string;

  @Field()
  @Column({ type: "int" })
  rating!: number;

  @Column()
  creatorId: number;

  @ManyToOne(() => Users, (user) => user.reviews)
  creator: Users;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
