import { MigrationInterface, QueryRunner } from "typeorm";

export class InitPeritajeOrdenesItems1720371000001 implements MigrationInterface {
  name = 'InitPeritajeOrdenesItems1720371000001'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // === Tabla Peritajes ===
    await queryRunner.query(`
      CREATE TABLE "Peritajes" (
        "Id" SERIAL PRIMARY KEY,
        "responsable" VARCHAR(255) NOT NULL,
        "Fecha" TIMESTAMP NOT NULL,
        "FechaModificacion" TIMESTAMP NULL,
        "estado" VARCHAR(50) DEFAULT 'PENDIENTE',
        "Vehiculo" INTEGER,
        CONSTRAINT "FK_Peritajes_Vehiculo"
          FOREIGN KEY ("Vehiculo")
          REFERENCES "Vehiculos"("Id_Vehiculo")
          ON DELETE SET NULL
          ON UPDATE CASCADE
      );
    `);

    // === Tabla OrdenesTrabajo ===
    await queryRunner.query(`
      CREATE TABLE "OrdenesTrabajo" (
        "Id" SERIAL PRIMARY KEY,
        "responsable" VARCHAR(255) NOT NULL,
        "Fecha" TIMESTAMP NOT NULL,
        "costo" INTEGER DEFAULT 0,
        "estado" VARCHAR(50) DEFAULT 'PROCESO',
        "peritajeId" INTEGER NOT NULL,
        "Id_Vehiculo" INTEGER NOT NULL,
        CONSTRAINT "FK_OrdenesTrabajo_Peritaje"
          FOREIGN KEY ("peritajeId")
          REFERENCES "Peritajes"("Id")
          ON DELETE CASCADE
          ON UPDATE CASCADE,
        CONSTRAINT "FK_OrdenesTrabajo_Vehiculo"
          FOREIGN KEY ("Id_Vehiculo")
          REFERENCES "Vehiculos"("Id_Vehiculo")
          ON DELETE RESTRICT
          ON UPDATE CASCADE
      );
    `);

    // === Tabla ItemOrden ===
    await queryRunner.query(`
      CREATE TABLE "ItemOrden" (
        "Id" SERIAL PRIMARY KEY,
        "Descripcion" VARCHAR(255) NOT NULL,
        "Tipo" VARCHAR(100) NOT NULL,
        "estado" VARCHAR(50) DEFAULT 'PENDIENTE',
        "Orden_Trabajo" INTEGER,
        "ordenTrabajo" INTEGER,
        CONSTRAINT "FK_ItemOrden_Peritaje"
          FOREIGN KEY ("Orden_Trabajo")
          REFERENCES "Peritajes"("Id")
          ON DELETE CASCADE
          ON UPDATE CASCADE,
        CONSTRAINT "FK_ItemOrden_OrdenTrabajo"
          FOREIGN KEY ("ordenTrabajo")
          REFERENCES "OrdenesTrabajo"("Id")
          ON DELETE SET NULL
          ON UPDATE CASCADE
      );
    `);

    // === Índices ===
    await queryRunner.query(`CREATE INDEX "IDX_Peritajes_Estado" ON "Peritajes" ("estado");`);
    await queryRunner.query(`CREATE INDEX "IDX_OrdenesTrabajo_Estado" ON "OrdenesTrabajo" ("estado");`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_OrdenesTrabajo_Estado";`);
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_Peritajes_Estado";`);
    await queryRunner.query(`ALTER TABLE "ItemOrden" DROP CONSTRAINT IF EXISTS "FK_ItemOrden_OrdenTrabajo";`);
    await queryRunner.query(`ALTER TABLE "ItemOrden" DROP CONSTRAINT IF EXISTS "FK_ItemOrden_Peritaje";`);
    await queryRunner.query(`ALTER TABLE "OrdenesTrabajo" DROP CONSTRAINT IF EXISTS "FK_OrdenesTrabajo_Peritaje";`);
    await queryRunner.query(`ALTER TABLE "OrdenesTrabajo" DROP CONSTRAINT IF EXISTS "FK_OrdenesTrabajo_Vehiculo";`);
    await queryRunner.query(`ALTER TABLE "Peritajes" DROP CONSTRAINT IF EXISTS "FK_Peritajes_Vehiculo";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "ItemOrden";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "OrdenesTrabajo";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "Peritajes";`);
  }
}
