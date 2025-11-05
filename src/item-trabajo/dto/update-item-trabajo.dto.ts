import { PartialType } from '@nestjs/mapped-types';
import { CreateItemTrabajoDto } from './create-item-trabajo.dto';

export class UpdateItemTrabajoDto extends PartialType(CreateItemTrabajoDto) {}
