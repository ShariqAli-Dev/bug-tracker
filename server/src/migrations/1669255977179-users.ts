import { MigrationInterface, QueryRunner } from "typeorm";
import { DEMO_USER_PASSWORD } from "../constants";

export class users1669255977179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    insert into users (id, email, role, password, name) values (1, 'demoAdmin@bugtracker.com', 'admin', '${DEMO_USER_PASSWORD}', 'admin');
    insert into users (id, email, role, password, name) values (2, 'demoProjectManager@bugtracker.com', 'project manager', '${DEMO_USER_PASSWORD}', 'project manager');
    insert into users (id, email, role, password, name) values (3, 'demoDeveloper@bugtracker.com', 'developer', '${DEMO_USER_PASSWORD}', 'developer');
    insert into users (id, email, role, password, name) values (4, 'demoSubmitter@bugtracker.com', 'submitter', '${DEMO_USER_PASSWORD}', 'submitter');`);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
