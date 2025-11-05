import { PartialType } from '@nestjs/mapped-types';
import { CreateItemOrdenDto } from './create-item-orden.dto';

export class UpdateItemOrdenDto extends PartialType(CreateItemOrdenDto) {}
