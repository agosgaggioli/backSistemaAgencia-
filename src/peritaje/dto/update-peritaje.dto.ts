import { PartialType } from '@nestjs/mapped-types';
import { CreatePeritajeDto } from './create-peritaje.dto';

export class UpdatePeritajeDto  {
     itemsPeritaje: ItemsDto[]
}
export class ItemsDto {

    Descripcion: string

    Tipo: string
}
