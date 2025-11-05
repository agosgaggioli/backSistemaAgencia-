import { Module } from '@nestjs/common';
import { PeritajeService } from './peritaje.service';
import { PeritajeController } from './peritaje.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Peritaje } from './entities/peritaje.entity';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { ItemOrdenService } from 'src/item-orden/item-orden.service';
import { ItemOrden } from 'src/item-orden/entities/item-orden.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Peritaje, Vehiculo, ItemOrden])
    ],
  controllers: [PeritajeController],
  providers: [PeritajeService, ItemOrdenService],
})
export class PeritajeModule {}
