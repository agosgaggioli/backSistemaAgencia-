import { Module } from '@nestjs/common';
import { ItemOrdenService } from './item-orden.service';
import { ItemOrden } from './entities/item-orden.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
      imports:[
          TypeOrmModule.forFeature([ItemOrden])
      ],
  controllers: [],
  providers: [ItemOrdenService],
})
export class ItemOrdenModule {}
