import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Review {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @CreateDateColumn({ type: "date" })
  createdAt: Date = new Date();

  @Field()
  @UpdateDateColumn({ type: "date" })
  updatedAt: Date = new Date();

  @Field()
  @Column({ type: "int" })
  userID!: number;

  @Field()
  @Column({})
  review!: string;

  @Field()
  @Column({ type: "int" })
  rating!: number;
}
