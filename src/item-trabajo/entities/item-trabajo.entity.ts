import { OrdenTrabajo } from "src/orden-trabajo/entities/orden-trabajo.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: "ITEMS-ORDEN-TRABAJO"})
export class ItemTrabajo {
        @PrimaryGeneratedColumn()
        Id: number
    
        @Column()
        Descripcion: string
    
        @Column()
        Tipo: string
    
        @ManyToOne(() => OrdenTrabajo, (orden) => orden.itemsOrden, {onDelete: 'CASCADE',})
        @JoinColumn({ name: "Orden_Trabajo" })
        OrdenTrabajo: OrdenTrabajo
}
