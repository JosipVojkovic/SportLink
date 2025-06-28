import { Module } from '@nestjs/common';
import { OwnedItemService } from './owned-item.service';
import { OwnedItemController } from './owned-item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OwnedItemController],
  providers: [OwnedItemService, PrismaService],
  exports: [OwnedItemService],
})
export class OwnedItemModule {}
