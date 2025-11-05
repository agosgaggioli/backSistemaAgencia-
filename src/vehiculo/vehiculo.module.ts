import { Module } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { VehiculoController } from './vehiculo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { Usado } from './entities/vehiculoUsado.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Vehiculo, Usado])
    ],
  controllers: [VehiculoController],
  providers: [VehiculoService],
})
export class VehiculoModule {}
