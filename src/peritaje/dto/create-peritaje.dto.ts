export class CreatePeritajeDto {

    responsable: string

    Fecha: Date

    itemsPeritaje: ItemsDto[]

    Id_Vehiculo: number
}
export class ItemsDto {

    Descripcion: string

    Tipo: string
}