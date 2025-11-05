import { Module } from '@nestjs/common';
import { ItemTrabajoService } from './item-trabajo.service';
import { ItemTrabajoController } from './item-trabajo.controller';

@Module({
  controllers: [ItemTrabajoController],
  providers: [ItemTrabajoService],
})
export class ItemTrabajoModule {}
