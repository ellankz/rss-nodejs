import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTable21624216682894 implements MigrationInterface {
    name = 'CreateTable21624216682894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "columnId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "columnId" SET NOT NULL`);
    }

}
