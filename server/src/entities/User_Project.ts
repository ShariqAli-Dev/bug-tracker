import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { Project } from "./Project";
import { Users } from "./Users";

@ObjectType()
@Entity()
export class User_Project extends BaseEntity {
  @Field()
  @PrimaryColumn({ type: "int" })
  projectId: number;

  @Field()
  @PrimaryColumn({ type: "int" })
  userId: number;

  @Field(() => Project)
  @ManyToOne(() => Project, (project) => project.user_project)
  project: Project;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.user_project)
  user: Users;
}
