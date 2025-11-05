import { ItemOrden } from "src/item-orden/entities/item-orden.entity";
import { OrdenTrabajo } from "src/orden-trabajo/entities/orden-trabajo.entity";
import { Vehiculo } from "src/vehiculo/entities/vehiculo.entity";
export declare class Peritaje {
    Id: number;
    responsable: string;
    Fecha: Date;
    FechaModificacion: Date;
    estado: string;
    ordenes: OrdenTrabajo[];
    itemsOrden: ItemOrden[];
    Vehiculo: Vehiculo;
}
