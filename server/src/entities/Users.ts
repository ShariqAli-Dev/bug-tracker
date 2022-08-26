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
export class Users {
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
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column({})
  role!: string;

  @Field()
  @Column({ type: "int" })
  tokenVersion: number = 0;

  @Column({})
  password!: string;
}
