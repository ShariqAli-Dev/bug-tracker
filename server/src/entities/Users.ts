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
  @Column({ type: "int", default: 0 })
  tokenVersion!: number;

  @Column()
  password!: string;

  @Field()
  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;
}
