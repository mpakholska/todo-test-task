import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1751538377150 implements MigrationInterface {
  name = 'Migration1751538377150';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "completed" boolean NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_tasks" ("user_id" integer NOT NULL, "task_id" integer NOT NULL, CONSTRAINT "PK_a22b2734df8bba2b8b7ebd3ae28" PRIMARY KEY ("user_id", "task_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_da349034af45568bdc0ab49314" ON "user_tasks" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_67a8a20c2e44bfb84ca1a33e6d" ON "user_tasks" ("task_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks" ADD CONSTRAINT "FK_da349034af45568bdc0ab493140" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks" ADD CONSTRAINT "FK_67a8a20c2e44bfb84ca1a33e6df" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_tasks" DROP CONSTRAINT "FK_67a8a20c2e44bfb84ca1a33e6df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_tasks" DROP CONSTRAINT "FK_da349034af45568bdc0ab493140"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_67a8a20c2e44bfb84ca1a33e6d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_da349034af45568bdc0ab49314"`,
    );
    await queryRunner.query(`DROP TABLE "user_tasks"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "task"`);
  }
}
