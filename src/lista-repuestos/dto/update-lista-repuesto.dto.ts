import { PartialType } from '@nestjs/mapped-types';
import { CreateListaRepuestoDto } from './create-lista-repuesto.dto';

export class UpdateListaRepuestoDto extends PartialType(CreateListaRepuestoDto) {}
