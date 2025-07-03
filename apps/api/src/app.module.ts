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
import { AuthModule } from './auth/auth.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, SportModule, GameModule, ParticipationModule, NotificationModule, ReviewModule, AvatarModule, ItemModule, OwnedItemModule, AuthModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
