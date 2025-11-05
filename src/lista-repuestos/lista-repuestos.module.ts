import { Module } from '@nestjs/common';
import { ListaRepuestosService } from './lista-repuestos.service';
import { ListaRepuestosController } from './lista-repuestos.controller';
import { ItemRepuesto } from 'src/item-repuestos/entities/item-repuesto.entity';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { Peritaje } from 'src/peritaje/entities/peritaje.entity';
import { ListaRepuesto } from './entities/lista-repuesto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepuestosService } from 'src/item-repuestos/item-repuestos.service';

@Module({
      imports:[
          TypeOrmModule.forFeature([Peritaje, Vehiculo, ItemRepuesto, ListaRepuesto])
      ],
  controllers: [ListaRepuestosController],
  providers: [ListaRepuestosService, ItemRepuestosService],
})
export class ListaRepuestosModule {}
