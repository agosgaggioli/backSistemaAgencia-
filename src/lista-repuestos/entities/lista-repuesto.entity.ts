import { ItemRepuesto } from "src/item-repuestos/entities/item-repuesto.entity";
import { Peritaje } from "src/peritaje/entities/peritaje.entity";
import { Vehiculo } from "src/vehiculo/entities/vehiculo.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "listaRepuestos"})
export class ListaRepuesto {

    @PrimaryGeneratedColumn()
    Id: Number

    @Column()
    fechaCreacion : Date

     @OneToMany(() => ItemRepuesto, (item) => item.listaRepuestos)
     itemsRepuestos: ItemRepuesto[]
   
     @OneToOne(() => Vehiculo)
     @JoinColumn({ name: "Vehiculo" })
     Vehiculo: Vehiculo

          @OneToOne(() => Peritaje)
     @JoinColumn({ name: "HojaTrabajo" })
     Peritaje: Peritaje
   

}
