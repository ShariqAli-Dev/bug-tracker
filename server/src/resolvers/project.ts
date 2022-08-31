import { query } from "express";
import { Project } from "../entities/Project";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class ProjectResolver {
  @Query(() => Project, { nullable: true })
  async project(@Arg("id") id: number): Promise<Project | null> {
    return await Project.findOne({ where: { id } });
  }
}
