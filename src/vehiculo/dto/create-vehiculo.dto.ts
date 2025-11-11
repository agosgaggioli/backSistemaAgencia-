import { IsEmpty, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator"

export class CreateVehiculoDto {

    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-ZÁÉÍÓÚÑ].*$/, {
        message: 'Marca debe comenzar con mayúscula',
    })
    Marca: string

    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-ZÁÉÍÓÚÑ].*$/, {
        message: 'Marca debe comenzar con mayúscula',
    })
    Modelo: string

    @IsString()
    @IsNotEmpty()
    Version: string

    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-ZÁÉÍÓÚÑ].*$/, {
        message: 'Marca debe comenzar con mayúscula',
    })
    Transmision: string

    @IsString()
    @IsNotEmpty()
    Combustible: string

    @IsString()
    @IsNotEmpty()
    Color: string

    @IsString()
    @IsEmpty()
    Marca_Motor: string

    @IsString()
    @IsEmpty()
    Numero_Motor: string

    @IsString()
    @IsEmpty()
    Marca_Chasis: string

    @IsString()
    @IsEmpty()
    Numero_Chasis: string

    @IsString()
    @IsEmpty()
    Moneda: string

    @IsString()
    @IsEmpty()
    Valor_Venta: number

    @IsString()
    @IsEmpty()
    Valor_Costo: number

    TipoVehiculo: VehiculoUsadoDto

}

export class VehiculoUsadoDto {

    @IsString()
    @IsNotEmpty()
    Dominio: string

    @IsString()
    @IsNotEmpty()
    Kilometros: string


    @IsString()
    @IsEmpty()
    Prov_Radic: string

    @IsString()
    @IsEmpty()
    Loc_Radic: string

    @IsString()
    @IsNotEmpty()
    Observaciones: string

    @IsNumber()
    @IsNotEmpty()
    anio: number
}
