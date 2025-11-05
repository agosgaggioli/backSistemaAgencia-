export declare class CreateVehiculoDto {
    Marca: string;
    Modelo: string;
    Version: string;
    Transmision: string;
    Combustible: string;
    Color: string;
    Marca_Motor: string;
    Numero_Motor: string;
    Marca_Chasis: string;
    Numero_Chasis: string;
    Moneda: string;
    Valor_Venta: number;
    Valor_Costo: number;
    TipoVehiculo: VehiculoUsadoDto;
}
export declare class VehiculoUsadoDto {
    Dominio: string;
    Kilometros: string;
    Prov_Radic: string;
    Loc_Radic: string;
    Observaciones: string;
    año: number;
}
