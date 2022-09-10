import { MigrationInterface, QueryRunner } from "typeorm";

// user_project
export class migrations1662851924931 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into user_project ("projectId", "userId") values (1, 1);
      insert into user_project ("projectId", "userId") values (2, 1);
      insert into user_project ("projectId", "userId") values (3, 1);
      insert into user_project ("projectId", "userId") values (2, 2);
      insert into user_project ("projectId", "userId") values (3, 2);
      insert into user_project ("projectId", "userId") values (1, 2);
      insert into user_project ("projectId", "userId") values (1, 3);`
    );
  }

  public async down(_: QueryRunner): Promise<void> {}
}
