import { MigrationInterface, QueryRunner } from "typeorm";
// project
export class migrations1662851923243 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into project (name, description, priority, type, status) values ('Towny', 'Puncture wound without foreign body of trachea, sequela', 'high', 'issue', 'in_progress');
      insert into project (name, description, priority, type, status) values ('Casey', 'Oth fx upper end of r radius, init for opn fx type 3A/B/C', 'immediate', 'feature', 'new');
      insert into project (name, description, priority, type, status) values ('Adan', 'Other inflammatory diseases of prepuce', 'high', 'feature', 'in_progress');
      insert into project (name, description, priority, type, status) values ('Leila', 'Nondisp oblique fx shaft of l femr, 7thF', 'low', 'issue', 'resolved');
      insert into project (name, description, priority, type, status) values ('Malachi', 'Cystic meniscus, anterior horn of medial meniscus, unsp knee', 'medium', 'bug', 'resolved');
      insert into project (name, description, priority, type, status) values ('Lovell', 'Stress fracture, ulna and radius', 'low', 'issue', 'new');
      insert into project (name, description, priority, type, status) values ('Lonny', 'Giant cell arteritis with polymyalgia rheumatica', 'low', 'feature', 'resolved');
      insert into project (name, description, priority, type, status) values ('Eleonora', 'Loose body in knee, left knee', 'low', 'bug', 'in_progress');
      insert into project (name, description, priority, type, status) values ('Evangelina', 'Pnctr w/o fb of r rng fngr w damage to nail, sequela', 'low', 'bug', 'in_progress');
      insert into project (name, description, priority, type, status) values ('Denyse', 'Unspecified foreign body in larynx', 'medium', 'issue', 'in_progress');
      insert into project (name, description, priority, type, status) values ('Sven', 'Other internal derangements of left knee', 'immediate', 'bug', 'in_progress');
      insert into project (name, description, priority, type, status) values ('Veda', 'Dislocation of carpometacarpal joint of left thumb', 'low', 'feature', 'resolved');
      insert into project (name, description, priority, type, status) values ('Jorry', 'Breakdown of bone devices, implants and grafts, subs', 'low', 'issue', 'resolved');
      insert into project (name, description, priority, type, status) values ('Kane', 'Neurotrophic keratoconjunctivitis, bilateral', 'immediate', 'feature', 'resolved');
      insert into project (name, description, priority, type, status) values ('Taryn', 'Puncture wound w foreign body of left upper arm, subs encntr', 'low', 'issue', 'resolved');
      insert into project (name, description, priority, type, status) values ('Lorry', 'Sltr-haris Type II physl fx upr end l tibia, 7thD', 'high', 'feature', 'new');
      insert into project (name, description, priority, type, status) values ('Felizio', 'Disp fx of med condyle of unsp tibia, 7thM', 'immediate', 'issue', 'in_progress');
      insert into project (name, description, priority, type, status) values ('Bev', 'Pnctr w/o fb of left eyelid and periocular area, sequela', 'low', 'issue', 'resolved');
      insert into project (name, description, priority, type, status) values ('Igor', 'Blister (nonthermal) of left shoulder, subsequent encounter', 'high', 'bug', 'in_progress');
      insert into project (name, description, priority, type, status) values ('Meridel', 'Unsp retrovirus as the cause of diseases classd elswhr', 'high', 'bug', 'new');
      `
    );
  }

  public async down(_: QueryRunner): Promise<void> {}
}
