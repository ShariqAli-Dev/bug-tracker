import { Migration } from '@mikro-orm/migrations';

export class Migration20220814021641 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "role" text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "role";');
  }

}
