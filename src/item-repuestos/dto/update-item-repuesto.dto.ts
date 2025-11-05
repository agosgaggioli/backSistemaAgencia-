import { PartialType } from '@nestjs/mapped-types';
import { CreateItemRepuestoDto } from './create-item-repuesto.dto';

export class UpdateItemRepuestoDto extends PartialType(CreateItemRepuestoDto) {}
