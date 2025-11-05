import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ListaRepuestosService } from './lista-repuestos.service';
import { CreateListaRepuestoDto } from './dto/create-lista-repuesto.dto';
import { UpdateListaRepuestoDto } from './dto/update-lista-repuesto.dto';

@Controller('lista-repuestos')
export class ListaRepuestosController {
  constructor(private readonly listaRepuestosService: ListaRepuestosService) {}

  @Post()
  create(@Body() createListaRepuestoDto: CreateListaRepuestoDto) {
    return this.listaRepuestosService.create(createListaRepuestoDto);
  }

  @Get( 
  )
  findAll() {
    return this.listaRepuestosService.findAll();
  }
  @Get("ByPeritaje/:id")
  findPeritaje(@Param('id') id: string){
    return this.listaRepuestosService.findOneByPeritaje(+id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listaRepuestosService.findOne(+id);
  }

  @Put("sePidio/:id")
  sePidio(@Param('id') id: string) {
    return this.listaRepuestosService.sePidio(+id);
  }

    @Put("llego/:id")
  llego(@Param('id') id: string) {
    return this.listaRepuestosService.llego(+id);
  }
}
