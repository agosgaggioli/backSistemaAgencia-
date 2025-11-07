import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameItemOrdenToSnake1720371000002 implements MigrationInterface {
  name = 'RenameItemOrdenToSnake1720371000002'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Renombra "ItemOrden" -> item_orden (minúsculas, sin comillas)
    await queryRunner.query(`ALTER TABLE "ItemOrden" RENAME TO item_orden;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE item_orden RENAME TO "ItemOrden";`);
  }
}
