import { Module } from '@nestjs/common';
import { OwnedItemService } from './owned-item.service';
import { OwnedItemController } from './owned-item.controller';

@Module({
  controllers: [OwnedItemController],
  providers: [OwnedItemService],
})
export class OwnedItemModule {}
