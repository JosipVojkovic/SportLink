import { Module } from '@nestjs/common';
import { OwnedItemService } from './owned-item.service';
import { OwnedItemController } from './owned-item.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OwnedItemController],
  providers: [OwnedItemService],
  exports: [OwnedItemService],
})
export class OwnedItemModule {}
