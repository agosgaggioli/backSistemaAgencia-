import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "VehiculoUsado" })
export class Usado {
    @PrimaryGeneratedColumn()
    Id_Vehiculo: number

    @Column({
        length: 50
    })
    Dominio: string

    @Column()
    Kilometros: string

    @Column({
        type: 'varchar',
        length: 65,
        nullable: true,
        name: 'prov_radic',
    })
    Prov_Radic: string | null

    @Column({
        type: 'varchar',
        length: 65,
        nullable: true,
        name: 'loc_radic',
    })
    Loc_Radic: string | null

    @Column({
        length: 255
    })
    Observaciones: string

    @Column()
    año: number
}