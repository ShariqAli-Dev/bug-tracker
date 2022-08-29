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
import { Comment } from "./Comment";

@ObjectType()
@Entity()
export class Ticket extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  submitter: string; // just their name

  @Field()
  @Column()
  developer: string;

  @Field()
  @Column()
  priority: string; // low medium high immediate

  @Field()
  @Column()
  type: string; // issue bug feature

  @Field()
  @Column()
  status: string; // new in-progress resolved

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Comment, (comment) => comment.ticket)
  comments: Comment[];

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
