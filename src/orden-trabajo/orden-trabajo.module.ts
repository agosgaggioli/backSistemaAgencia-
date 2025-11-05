import { Module } from '@nestjs/common';
import { OrdenTrabajoService } from './orden-trabajo.service';
import { OrdenTrabajoController } from './orden-trabajo.controller';
import { ItemOrden } from 'src/item-orden/entities/item-orden.entity';
import { Peritaje } from 'src/peritaje/entities/peritaje.entity';
import { ItemTrabajo } from 'src/item-trabajo/entities/item-trabajo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import { OrdenTrabajo } from './entities/orden-trabajo.entity';

@Module({
        imports:[
            TypeOrmModule.forFeature([ItemOrden, Peritaje, ItemTrabajo, Vehiculo, OrdenTrabajo])
        ],
  controllers: [OrdenTrabajoController],
  providers: [OrdenTrabajoService],
})
export class OrdenTrabajoModule {}
