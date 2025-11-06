// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm';

import { VehiculoModule } from './vehiculo/vehiculo.module';
import { PeritajeModule } from './peritaje/peritaje.module';
import { ItemOrdenModule } from './item-orden/item-orden.module';
import { OrdenTrabajoModule } from './orden-trabajo/orden-trabajo.module';
import { ItemTrabajoModule } from './item-trabajo/item-trabajo.module';
import { ListaRepuestosModule } from './lista-repuestos/lista-repuestos.module';
import { ItemRepuestosModule } from './item-repuestos/item-repuestos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : undefined,
      ignoreEnvFile: process.env.NODE_ENV === 'production', // ⬅️ clave
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm')!,
    }),

    VehiculoModule,
    PeritajeModule,
    ItemOrdenModule,
    OrdenTrabajoModule,
    ItemTrabajoModule,
    ListaRepuestosModule,
    ItemRepuestosModule,
  ],
})
export class AppModule {}
