import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryColumn } from "typeorm";
// import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
// import { Project } from "./Project";
// import { Users } from "./Users";

@ObjectType()
@Entity()
export class User_Project extends BaseEntity {
  @Field()
  @PrimaryColumn()
  projectId: number;

  @Field()
  @PrimaryColumn()
  userId: number;

  // @Field(() => Project)
  // @ManyToOne(() => Project, (project) => project.user_project)
  // project: Project;

  // @Field(() => Users)
  // @ManyToOne(() => Users, (user) => user.user_project)
  // user: Users;
}
