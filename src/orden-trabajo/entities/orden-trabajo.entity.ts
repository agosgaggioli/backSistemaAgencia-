import { ItemOrden } from "src/item-orden/entities/item-orden.entity";
import { ItemTrabajo } from "src/item-trabajo/entities/item-trabajo.entity";
import { Peritaje } from "src/peritaje/entities/peritaje.entity";
import { Vehiculo } from "src/vehiculo/entities/vehiculo.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "OrdenesTrabajo" })
export class OrdenTrabajo {

    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    responsable: string

    @Column()
    Fecha: Date

    @Column({default:0})
    costo: number

    @Column({ default: "PROCESO" })
    estado: string

    @ManyToOne(() => Peritaje, (peritaje) => peritaje.ordenes, {
        onDelete: 'CASCADE', 
        nullable: false,
    })
    @JoinColumn({ name: 'peritajeId' })
    peritaje: Peritaje;

@ManyToOne(() => Vehiculo, v => v.ordenes, {
  nullable: false,
  onDelete: 'RESTRICT', // o 'SET NULL' si permitís borrar el vehículo
})
@JoinColumn({ name: 'Id_Vehiculo' }) // FK en la tabla OrdenesTrabajo
Vehiculo: Vehiculo;

    @OneToMany(() => ItemOrden, (item) => item.orden)
    itemsOrden: ItemOrden[]
}
