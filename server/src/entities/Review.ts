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
  creatorID: number;

  @ManyToOne(() => Users, (user) => user.reviews)
  creator: Users;

  @Field()
  @Column({ type: "int" })
  userID!: number;

  @Field()
  @Column()
  review!: string;

  @Field()
  @Column({ type: "int" })
  rating!: number;

  @Field()
  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;
}
