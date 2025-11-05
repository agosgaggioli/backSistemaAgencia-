import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { PeritajeService } from './peritaje.service';
import { CreatePeritajeDto } from './dto/create-peritaje.dto';
import { UpdatePeritajeDto } from './dto/update-peritaje.dto';

@Controller('peritaje')
export class PeritajeController {
  constructor(private readonly peritajeService: PeritajeService) {}

  @Post()
  create(@Body() createPeritajeDto: CreatePeritajeDto) {
    return this.peritajeService.create(createPeritajeDto);
  }

  @Get()
  findAll() {
    return this.peritajeService.findAll();
  }
  // GET /stats/vehiculos-peritados?year=YYYY (opcional, default: año actual)

@Get('stats/vehiculos-peritados')
async vehiculosPeritados(@Query('year') year?: string) {
  const y = Number(year) || new Date().getFullYear();
  return this.peritajeService.peritadosPorMes(y);
}

  @Get("panel")
  async panelPeritajes(){
    return await this.peritajeService.countEstados()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peritajeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePeritajeDto: UpdatePeritajeDto) {
    return this.peritajeService.addItemsNoDup(+id, updatePeritajeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peritajeService.remove(+id);
  }

  @Get()
async find(@Query('dominio') dominio: string) {
  return this.peritajeService.buscarPorDominio(dominio ?? '');
}
}
