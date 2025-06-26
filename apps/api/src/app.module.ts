import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SportModule } from './sport/sport.module';
import { GameModule } from './game/game.module';
import { ParticipationModule } from './participation/participation.module';
import { NotificationModule } from './notification/notification.module';
import { ReviewModule } from './review/review.module';
import { AvatarModule } from './avatar/avatar.module';
import { ItemModule } from './item/item.module';
import { OwnedItemModule } from './owned-item/owned-item.module';

@Module({
  imports: [UserModule, SportModule, GameModule, ParticipationModule, NotificationModule, ReviewModule, AvatarModule, ItemModule, OwnedItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
