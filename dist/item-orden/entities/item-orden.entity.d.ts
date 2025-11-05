import { OrdenTrabajo } from "src/orden-trabajo/entities/orden-trabajo.entity";
import { Peritaje } from "src/peritaje/entities/peritaje.entity";
export declare class ItemOrden {
    Id: number;
    Descripcion: string;
    Tipo: string;
    estado: string;
    hojaTrabajo: Peritaje;
    orden: OrdenTrabajo | null;
}
