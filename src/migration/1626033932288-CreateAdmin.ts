import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAdmin1626033932288 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO `users` VALUES ('7ebe6660-1285-4d16-95e6-39b5c4d08136','admin','admin','admin')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "DELETE FROM `users` WHERE id = '7ebe6660-1285-4d16-95e6-39b5c4d08136';",
    );
  }
}
