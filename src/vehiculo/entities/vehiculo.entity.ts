import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usado } from "./vehiculoUsado.entity";
import { OrdenTrabajo } from "src/orden-trabajo/entities/orden-trabajo.entity";

@Entity({ name: "Vehiculos" })
export class Vehiculo {

    @PrimaryGeneratedColumn()
    Id_Vehiculo: number

    @Column({
        length: 100
    })
    Marca: string

    @Column({
        length: 100
    })
    Modelo: string

    @Column({
        length: 100
    })
    Version: string

    @Column({
        length: 100
    })
    Transmision: string

    @Column({
        length: 100
    })
    Combustible: string

    @Column({
        length: 100
    })
    Color: string

    @Column({
        type: 'varchar',
        length: 65,
        nullable: true,
        name: 'marca_motor',
    })
    Marca_Motor: string | null

    @Column({
        type: 'varchar',
        length: 65,
        nullable: true,
        name: 'numero_motor',
    })
    Numero_Motor: string | null

    @Column({
        type: 'varchar',
        length: 65,
        nullable: true,
        name: 'marca_chasis',
    })
    Marca_Chasis: string | null

    @Column({
        type: 'varchar',
        length: 65,
        nullable: true,
        name: 'numero_chasis',
    })
    Numero_Chasis: string | null

    @Column({
        type: 'varchar',
        length: 65,
        nullable: true,
        name: 'moneda',
    })
    Moneda: string | null

    @Column({
        nullable: true,
        default: 0
    })
    Valor_Venta: number 

    @Column({
        nullable: true,
        default: 0
    })
    Valor_Costo: number 

    @Column({ default: "NO" })
    Peritada: string

    @Column({ default: "SALON" })
    UBICACION: string

    @OneToOne(() => Usado)
    @JoinColumn({ name: "TipoVehiculo" })
    TipoVehiculo: Usado;
    @OneToMany(() => OrdenTrabajo, o => o.Vehiculo)
ordenes: OrdenTrabajo[];

    /*@OneToMany(() => HojaTrabajo, (hoja) => hoja.Vehiculo)
    HojasTrabajo: HojaTrabajo[]*/

}
