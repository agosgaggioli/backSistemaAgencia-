import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, Put } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { SearchVehiculoDto } from './dto/busqueda-vehiculo';

@Controller('vehiculo')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Post()
  async create(@Body() createVehiculoDto: CreateVehiculoDto) {
    return await this.vehiculoService.create(createVehiculoDto);
  }

  @Get()
  async findAll() {
    return await this.vehiculoService.findAll();
  }

  
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateVehiculoDto: Partial<CreateVehiculoDto>) {
    return await this.vehiculoService.update(+id, updateVehiculoDto);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.vehiculoService.remove(+id);
  }
  
  @Get('search')
 async search(
  @Query('Id_Vehiculo') Id_Vehiculo?: string,
  @Query('marca') marca?: string,
  @Query('dominio') dominio?: string,
) {
  Id_Vehiculo = Id_Vehiculo?.trim();
  marca = marca?.trim();
  dominio= dominio?.trim();

  if (!Id_Vehiculo && !marca && !dominio) {
    throw new BadRequestException('Enviá al menos Id_Vehiculo o marca o dominio.');
  }
  return this.vehiculoService.search({ Id_Vehiculo, marca , dominio });
}

@Get("Panel")
async PanelGeneralVehiculo(){
  const vehiculos = await this.vehiculoService.countVehiculos()
  const vehiculosPeritados = await  this.vehiculoService.countVehiculosPeritados()
  return {vehiculos, vehiculosPeritados}
}
@Get(':id')
async findOne(@Param('id') id: string) {
  return await this.vehiculoService.findOne(+id);
}
}
