import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

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
