import { MigrationInterface, QueryRunner } from "typeorm";
// users migration
export class migrations1668566475322 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    insert into users (id, email, role, password, name) values (1, 'demoAdmin@bugtracker.com', 'admin', 'demopassword', 'admin');
    
    insert into users (id, email, role, password, name) values (2, 'demoProjectManager@bugtracker.com', 'project manager', 'demopassword', 'project manager');
    
    insert into users (id, email, role, password, name) values (3, 'demoDeveloper@bugtracker.com', 'developer', 'demopassword', 'developer');
    
    insert into users (id, email, role, password, name) values (4, 'demoSubmitter@bugtracker.com', 'submitter', 'demopassword', 'submitter');`);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
