import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemTrabajoService } from './item-trabajo.service';
import { CreateItemTrabajoDto } from './dto/create-item-trabajo.dto';
import { UpdateItemTrabajoDto } from './dto/update-item-trabajo.dto';

@Controller('item-trabajo')
export class ItemTrabajoController {
  constructor(private readonly itemTrabajoService: ItemTrabajoService) {}

  @Post()
  create(@Body() createItemTrabajoDto: CreateItemTrabajoDto) {
    return this.itemTrabajoService.create(createItemTrabajoDto);
  }

  @Get()
  findAll() {
    return this.itemTrabajoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemTrabajoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemTrabajoDto: UpdateItemTrabajoDto) {
    return this.itemTrabajoService.update(+id, updateItemTrabajoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemTrabajoService.remove(+id);
  }
}
