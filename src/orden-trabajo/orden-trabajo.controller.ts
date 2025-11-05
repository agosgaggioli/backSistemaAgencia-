import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { OrdenTrabajoService } from './orden-trabajo.service';
import { CreateOrdenTrabajoDto } from './dto/create-orden-trabajo.dto';
import { UpdateOrdenTrabajoDto } from './dto/update-orden-trabajo.dto';
import { costoOrdenDto } from './dto/costo-orden-trabajo.dto';

@Controller('orden-trabajo')
export class OrdenTrabajoController {
  constructor(private readonly ordenTrabajoService: OrdenTrabajoService) {}

  @Post()
  async create(@Body() createOrdenTrabajoDto: CreateOrdenTrabajoDto) {
    return await this.ordenTrabajoService.create(createOrdenTrabajoDto);
  }

  @Get()
  async findAll() {
    return await this.ordenTrabajoService.findAll();
  }

  @Get("panel")
  async panelOrdenes(){
    const ordenesRetrasadas = await this.ordenTrabajoService.ordenPeligro()
    return ordenesRetrasadas
  }

  @Get("vehiculosAlerta")
  async vehiculosAlerta(){
    return await this.ordenTrabajoService.vehiculosAlerta()
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ordenTrabajoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrdenTrabajoDto: UpdateOrdenTrabajoDto) {
    return this.ordenTrabajoService.updateAddItems(+id, updateOrdenTrabajoDto);
  }
  @Put('finalizar/:id')
  updateFinalizar(@Param('id') id: string, @Body() updateOrdenTrabajoDto: costoOrdenDto) {
    return this.ordenTrabajoService.updateFinalizar(+id, updateOrdenTrabajoDto);
  }
  @Put('costo/:id')
  updateCosto(@Param('id') id: string, @Body() updateOrdenTrabajoDto: costoOrdenDto) {
    return this.ordenTrabajoService.updateCosto(+id, updateOrdenTrabajoDto);
  }

  



}
