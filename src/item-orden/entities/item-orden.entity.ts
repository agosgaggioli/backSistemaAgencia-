import { Delete } from "@nestjs/common"
import { OrdenTrabajo } from "src/orden-trabajo/entities/orden-trabajo.entity"
import { Peritaje } from "src/peritaje/entities/peritaje.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class ItemOrden {
    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    Descripcion: string

    @Column()
    Tipo: string

    @Column({ default: "PENDIENTE" })
    estado: string

    @ManyToOne(() => Peritaje, (orden) => orden.itemsOrden, { onDelete: 'CASCADE', })
    @JoinColumn({ name: "Orden_Trabajo" })
    hojaTrabajo: Peritaje

    @ManyToOne(() => OrdenTrabajo, o => o.itemsOrden, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'ordenTrabajo' })
    orden: OrdenTrabajo | null;
}
