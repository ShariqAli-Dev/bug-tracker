import { MigrationInterface, QueryRunner } from "typeorm";
import { DEMO_USER_PASSWORD } from "../constants";

export class users1669255977179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    insert into users (email, role, password, name) values ( 'demoAdmin@bugtracker.com', 'admin', '${DEMO_USER_PASSWORD}', 'admin');
    insert into users (email, role, password, name) values ( 'demoProjectManager@bugtracker.com', 'project manager', '${DEMO_USER_PASSWORD}', 'project manager');
    insert into users (email, role, password, name) values ( 'demoDeveloper@bugtracker.com', 'developer', '${DEMO_USER_PASSWORD}', 'developer');
    insert into users (email, role, password, name) values ( 'demoSubmitter@bugtracker.com', 'submitter', '${DEMO_USER_PASSWORD}', 'submitter');`);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
