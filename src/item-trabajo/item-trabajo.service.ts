import { Injectable } from '@nestjs/common';
import { CreateItemTrabajoDto } from './dto/create-item-trabajo.dto';
import { UpdateItemTrabajoDto } from './dto/update-item-trabajo.dto';

@Injectable()
export class ItemTrabajoService {
  create(createItemTrabajoDto: CreateItemTrabajoDto) {
    return 'This action adds a new itemTrabajo';
  }

  findAll() {
    return `This action returns all itemTrabajo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemTrabajo`;
  }

  update(id: number, updateItemTrabajoDto: UpdateItemTrabajoDto) {
    return `This action updates a #${id} itemTrabajo`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemTrabajo`;
  }
}
