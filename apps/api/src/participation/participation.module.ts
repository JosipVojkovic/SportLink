import { Module } from '@nestjs/common';
import { ParticipationService } from './participation.service';
import { ParticipationController } from './participation.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ParticipationController],
  providers: [ParticipationService, PrismaService],
  exports: [ParticipationService],
})
export class ParticipationModule {}
