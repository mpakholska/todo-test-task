import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1751464623765 implements MigrationInterface {
    name = 'Migration1751464623765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" character varying NOT NULL, "title" character varying NOT NULL, "completed" boolean NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
