import { MigrationInterface, QueryRunner } from "typeorm";
import { DEMO_USER_PASSWORD } from "../constants";

export class users1669255977179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO users (id, email, role, password, name) VALUES (1, 'demoAdmin@bugtracker.com', 'admin', '${DEMO_USER_PASSWORD}', 'admin');
      INSERT INTO users (id, email, role, password, name) VALUES (2, 'demoProjectManager@bugtracker.com', 'project manager', '${DEMO_USER_PASSWORD}', 'project manager');
      INSERT INTO users (id, email, role, password, name) VALUES (3, 'demoDeveloper@bugtracker.com', 'developer', '${DEMO_USER_PASSWORD}', 'developer');
      INSERT INTO users (id, email, role, password, name) VALUES (4, 'demoSubmitter@bugtracker.com', 'submitter', '${DEMO_USER_PASSWORD}', 'submitter');
    `);
    await queryRunner.query(`
      SELECT setval(pg_get_serial_sequence('users', 'id'), coalesce(max(id),0) + 1, false) FROM users;
    `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
