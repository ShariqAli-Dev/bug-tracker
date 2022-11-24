import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1669141510853 implements MigrationInterface {
  name = "Initial1669141510853";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_ticket" ("ticketId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_6732da3236bfffb05ae88579ad4" PRIMARY KEY ("ticketId", "userId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "role" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_project" ("projectId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_2a37107e0b3bdb06b4920a64bbc" PRIMARY KEY ("projectId", "userId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "archived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_dedfea394088ed136ddadeee89c" UNIQUE ("name"), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "projectId" integer NOT NULL, "creator" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "priority" character varying NOT NULL, "type" character varying NOT NULL, "status" character varying NOT NULL, "archived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" SERIAL NOT NULL, "ticketId" integer NOT NULL, "userId" integer NOT NULL, "message" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user_ticket" ADD CONSTRAINT "FK_fa298f42e916dffbd57dd496721" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_ticket" ADD CONSTRAINT "FK_af5341f8c0b28582d959ef5dd19" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_project" ADD CONSTRAINT "FK_cb5415b5e54f476329451212e9b" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_project" ADD CONSTRAINT "FK_b88a18e4faeea3bce60d70a4ae3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_c6f47d3e270123ccd2f16f13d29" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_7522f1f6b36fa4b1742762a17f9" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_7522f1f6b36fa4b1742762a17f9"`
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_c6f47d3e270123ccd2f16f13d29"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_project" DROP CONSTRAINT "FK_b88a18e4faeea3bce60d70a4ae3"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_project" DROP CONSTRAINT "FK_cb5415b5e54f476329451212e9b"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_ticket" DROP CONSTRAINT "FK_af5341f8c0b28582d959ef5dd19"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_ticket" DROP CONSTRAINT "FK_fa298f42e916dffbd57dd496721"`
    );

    await queryRunner.query(`DROP TABLE "comment"`);
    await queryRunner.query(`DROP TABLE "ticket"`);
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP TABLE "user_project"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "user_ticket"`);
  }
}
