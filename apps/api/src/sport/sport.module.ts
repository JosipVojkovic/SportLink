import { Module } from '@nestjs/common';
import { SportService } from './sport.service';
import { SportController } from './sport.controller';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SportController],
  providers: [SportService, PrismaService],
  exports: [SportService],
})
export class SportModule {}
