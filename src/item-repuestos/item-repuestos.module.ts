import { Module } from '@nestjs/common';
import { ItemRepuestosService } from './item-repuestos.service';

import { ListaRepuesto } from 'src/lista-repuestos/entities/lista-repuesto.entity';
import { ItemRepuesto } from './entities/item-repuesto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
      imports:[
          TypeOrmModule.forFeature([ItemRepuesto])
      ],
  controllers: [],
  providers: [ItemRepuestosService] ,
})
export class ItemRepuestosModule {}
