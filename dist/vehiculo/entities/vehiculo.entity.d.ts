import { Usado } from "./vehiculoUsado.entity";
import { OrdenTrabajo } from "src/orden-trabajo/entities/orden-trabajo.entity";
export declare class Vehiculo {
    Id_Vehiculo: number;
    Marca: string;
    Modelo: string;
    Version: string;
    Transmision: string;
    Combustible: string;
    Color: string;
    Marca_Motor: string | null;
    Numero_Motor: string | null;
    Marca_Chasis: string | null;
    Numero_Chasis: string | null;
    Moneda: string | null;
    Valor_Venta: number;
    Valor_Costo: number;
    Peritada: string;
    UBICACION: string;
    TipoVehiculo: Usado;
    ordenes: OrdenTrabajo[];
}
