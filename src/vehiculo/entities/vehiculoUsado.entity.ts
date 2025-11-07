import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "VehiculoUsado" })
export class Usado {
  // 👇 MUY IMPORTANTE: el nombre REAL de la PK en la tabla
  @PrimaryGeneratedColumn({ name: 'Id_Vehiculo' })
  Id_Vehiculo: number;

  @Column({ length: 50 })
  Dominio: string;

  @Column()
  Kilometros: string;

  @Column({ type: 'varchar', length: 65, nullable: true, name: 'prov_radic' })
  Prov_Radic: string | null;

  @Column({ type: 'varchar', length: 65, nullable: true, name: 'loc_radic' })
  Loc_Radic: string | null;

  @Column({ length: 255 })
  Observaciones: string;

  // 👇 Mejor evitar usar una propiedad con tilde.
  //    Mapeá el nombre de columna "año" a una propiedad TS sin tilde:
  @Column({ name: 'año', type: 'int' })
  anio: number;
}
