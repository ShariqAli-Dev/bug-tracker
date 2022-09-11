import { MigrationInterface, QueryRunner } from "typeorm";
// users
export class migrations1662851920996 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into users (email, "role", "tokenVersion", "password") values ('bob@bob.com', 'submitter', 21, '$argon2id$v=19$m=4096,t=3,p=1$kloTqsCRvw+APxv87PTscQ$IZQbKTKl59TcxAvPMQOOi8or20Sw08KGWTL4Qb9Iot4');
      insert into users (email, "role", "tokenVersion", "password") values ('eharlett1@instagram.com', 'submitter', 13, '$argon2id$v=19$m=4096,t=3,p=1$kloTqsCRvw+APxv87PTscQ$IZQbKTKl59TcxAvPMQOOi8or20Sw08KGWTL4Qb9Iot4;');
      insert into users (email, "role", "tokenVersion", "password") values ('cjayes2@lycos.com', 'admin', 56, '$argon2id$v=19$m=4096,t=3,p=1$kloTqsCRvw+APxv87PTscQ$IZQbKTKl59TcxAvPMQOOi8or20Sw08KGWTL4Qb9Iot4;');
      insert into users (email, "role", "tokenVersion", "password") values ('dmcward3@wiley.com', 'developer', 99, 'p=1$ngaJiYvB4fyVHrHHTnBrUg$6JemzEfjQvZeP/');
      insert into users (email, "role", "tokenVersion", "password") values ('ltrollope4@mit.edu', 'submitter', 9, '$argon2id$v=19$m=4096,t=3,p=1$kloTqsCRvw+APxv87PTscQ$IZQbKTKl59TcxAvPMQOOi8or20Sw08KGWTL4Qb9Iot4;');
      insert into users (email, "role", "tokenVersion", "password") values ('afearnyhough5@taobao.com', 'developer', 1, '$argon2id$v=19$m=4096,t=3,p=1$kloTqsCRvw+APxv87PTscQ$IZQbKTKl59TcxAvPMQOOi8or20Sw08KGWTL4Qb9Iot4;');
      insert into users (email, "role", "tokenVersion", "password") values ('aducker6@nba.com', 'submitter', 19, 'p=1$ngaJiYvB4fyVHrHHTnBrUg$6JemzEfjQvZeP/');
      insert into users (email, "role", "tokenVersion", "password") values ('nlowing7@gov.uk', 'developer', 46, 'p=1$ngaJiYvB4fyVHrHHTnBrUg$6JemzEfjQvZeP/');
      insert into users (email, "role", "tokenVersion", "password") values ('aclubb8@techcrunch.com', 'developer', 19, '$argon2id$v=19$m=4096,t=3,p=1$kloTqsCRvw+APxv87PTscQ$IZQbKTKl59TcxAvPMQOOi8or20Sw08KGWTL4Qb9Iot4');
      insert into users (email, "role", "tokenVersion", "password") values ('nfellnee9@netlog.com', 'admin', 5, '$argon2id$v=19$m=4096,t=3,p=1$kloTqsCRvw+APxv87PTscQ$IZQbKTKl59TcxAvPMQOOi8or20Sw08KGWTL4Qb9Iot4;');`
    );
  }

  public async down(_: QueryRunner): Promise<void> {}
}
