import { MigrationInterface, QueryRunner } from "typeorm";

export class InitListaEItemsRepuestos1720372000003 implements MigrationInterface {
  name = 'InitListaEItemsRepuestos1720372000003'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // === Tabla "listaRepuestos" ===
    await queryRunner.query(`
      CREATE TABLE "listaRepuestos" (
        "Id" SERIAL PRIMARY KEY,
        "fechaCreacion" TIMESTAMP NOT NULL DEFAULT NOW(),
        "Vehiculo" INTEGER,
        "HojaTrabajo" INTEGER,
        CONSTRAINT "UQ_listaRepuestos_Vehiculo" UNIQUE ("Vehiculo"),
        CONSTRAINT "UQ_listaRepuestos_HojaTrabajo" UNIQUE ("HojaTrabajo"),
        CONSTRAINT "FK_listaRepuestos_Vehiculo"
          FOREIGN KEY ("Vehiculo")
          REFERENCES "Vehiculos"("Id_Vehiculo")
          ON DELETE SET NULL
          ON UPDATE CASCADE,
        CONSTRAINT "FK_listaRepuestos_Peritaje"
          FOREIGN KEY ("HojaTrabajo")
          REFERENCES "Peritajes"("Id")
          ON DELETE SET NULL
          ON UPDATE CASCADE
      );
    `);

    // Índices útiles (opcionales pero recomendados)
    await queryRunner.query(`
      CREATE INDEX "IDX_listaRepuestos_Vehiculo" ON "listaRepuestos" ("Vehiculo");
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_listaRepuestos_HojaTrabajo" ON "listaRepuestos" ("HojaTrabajo");
    `);

    // === Tabla "itemRepuesto" ===
    await queryRunner.query(`
      CREATE TABLE "itemRepuesto" (
        "Id" SERIAL PRIMARY KEY,
        "Descripcion" VARCHAR(255) NOT NULL,
        "Tipo" VARCHAR(100) NOT NULL,
        "estado" VARCHAR(50) NOT NULL DEFAULT 'PENDIENTE',
        "ListaRepuestos" INTEGER NOT NULL,
        CONSTRAINT "FK_itemRepuesto_ListaRepuestos"
          FOREIGN KEY ("ListaRepuestos")
          REFERENCES "listaRepuestos"("Id")
          ON DELETE CASCADE
          ON UPDATE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_itemRepuesto_ListaRepuestos" ON "itemRepuesto" ("ListaRepuestos");
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_itemRepuesto_estado" ON "itemRepuesto" ("estado");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Bajar índices y tablas en orden inverso
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_itemRepuesto_estado";`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_itemRepuesto_ListaRepuestos";`);
    await queryRunner.query(`ALTER TABLE "itemRepuesto" DROP CONSTRAINT IF EXISTS "FK_itemRepuesto_ListaRepuestos";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "itemRepuesto";`);

    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_listaRepuestos_HojaTrabajo";`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_listaRepuestos_Vehiculo";`);
    await queryRunner.query(`ALTER TABLE "listaRepuestos" DROP CONSTRAINT IF EXISTS "FK_listaRepuestos_Peritaje";`);
    await queryRunner.query(`ALTER TABLE "listaRepuestos" DROP CONSTRAINT IF EXISTS "FK_listaRepuestos_Vehiculo";`);
    await queryRunner.query(`ALTER TABLE "listaRepuestos" DROP CONSTRAINT IF EXISTS "UQ_listaRepuestos_HojaTrabajo";`);
    await queryRunner.query(`ALTER TABLE "listaRepuestos" DROP CONSTRAINT IF EXISTS "UQ_listaRepuestos_Vehiculo";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "listaRepuestos";`);
  }
}
