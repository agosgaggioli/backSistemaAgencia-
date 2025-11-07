import { ItemOrden } from "src/item-orden/entities/item-orden.entity";
import { OrdenTrabajo } from "src/orden-trabajo/entities/orden-trabajo.entity";
import { Vehiculo } from "src/vehiculo/entities/vehiculo.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Peritajes" })
export class Peritaje {
  @PrimaryGeneratedColumn()
  Id: number

  @Column()
  responsable: string

  @Column()
  Fecha: Date

 @Column({ type: 'timestamp', nullable: true })
FechaModificacion: Date;

  @Column({ default: "PENDIENTE" })
  estado: string

  @OneToMany(() => OrdenTrabajo, (orden) => orden.peritaje, {
    cascade: ['insert', 'update'],
  })
  ordenes: OrdenTrabajo[];

  @OneToMany(() => ItemOrden, (item) => item.hojaTrabajo)
  itemsOrden: ItemOrden[]

@OneToOne(() => Vehiculo)
@JoinColumn({
  name: 'Vehiculo',                   // FK en "Peritajes"
  referencedColumnName: 'Id_Vehiculo' // PK real en "Vehiculos"
})
  Vehiculo: Vehiculo



}
