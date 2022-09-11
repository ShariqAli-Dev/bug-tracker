import { MigrationInterface, QueryRunner } from "typeorm";
// project
export class migrations1662851923243 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into project ("name", description) values ('Ruggles of Red Gap', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.');
      insert into project ("name", description) values ('Which Way Is the Front Line From Here?  The Life and Time of Tim Hetherington', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.');
      insert into project ("name", description) values ('Cheerleader Massacre', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.');
      insert into project ("name", description) values ('Shine a Light', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.');
      insert into project ("name", description) values ('Dororo', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.');
      insert into project ("name", description) values ('Back to the Secret Garden', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.');
      insert into project ("name", description) values ('Emmet Otter''s Jug-Band Christmas', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.');
      insert into project ("name", description) values ('Art & Copy', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.');
      insert into project ("name", description) values ('Lust for Life', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.');
      insert into project ("name", description) values ('Neighbors', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.');`
    );
  }

  public async down(_: QueryRunner): Promise<void> {}
}
