import { Injectable } from '@nestjs/common';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ParticipationService {
  constructor(private readonly prisma: PrismaService) {}
  create(createParticipationDto: CreateParticipationDto) {
    return this.prisma.participation.create({ data: createParticipationDto });
  }

  findAll() {
    return this.prisma.participation.findMany();
  }

  findOne(id: string) {
    return this.prisma.participation.findUnique({ where: { id } });
  }

  update(id: string, updateParticipationDto: UpdateParticipationDto) {
    return this.prisma.participation.update({
      where: { id },
      data: updateParticipationDto,
    });
  }

  remove(id: string) {
    return this.prisma.participation.delete({ where: { id } });
  }
}
