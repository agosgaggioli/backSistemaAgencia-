import { ListaRepuesto } from "src/lista-repuestos/entities/lista-repuesto.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "itemRepuesto"})
export class ItemRepuesto {

 @PrimaryGeneratedColumn()
    Id: number

    @Column()
    Descripcion: string

    @Column()
    Tipo: string

    @Column({ default: "PENDIENTE" })
    estado: string

    @ManyToOne(() => ListaRepuesto, (lista) => lista.itemsRepuestos, { onDelete: 'CASCADE', })
    @JoinColumn({ name: "ListaRepuestos" })
    listaRepuestos: ListaRepuesto
    

}
