import { ItemOrden } from "src/item-orden/entities/item-orden.entity";
import { Peritaje } from "src/peritaje/entities/peritaje.entity";
import { Vehiculo } from "src/vehiculo/entities/vehiculo.entity";
export declare class OrdenTrabajo {
    Id: number;
    responsable: string;
    Fecha: Date;
    costo: number;
    estado: string;
    peritaje: Peritaje;
    Vehiculo: Vehiculo;
    itemsOrden: ItemOrden[];
}
