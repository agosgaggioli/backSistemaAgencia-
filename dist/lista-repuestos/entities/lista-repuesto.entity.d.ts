import { ItemRepuesto } from "src/item-repuestos/entities/item-repuesto.entity";
import { Peritaje } from "src/peritaje/entities/peritaje.entity";
import { Vehiculo } from "src/vehiculo/entities/vehiculo.entity";
export declare class ListaRepuesto {
    Id: Number;
    fechaCreacion: Date;
    itemsRepuestos: ItemRepuesto[];
    Vehiculo: Vehiculo;
    Peritaje: Peritaje;
}
