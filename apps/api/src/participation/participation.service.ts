import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ParticipationService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(createParticipationDto: CreateParticipationDto) {
    return this.prisma.participation.create({ data: createParticipationDto });
  }

  async findAll() {
    return this.prisma.participation.findMany();
  }

  async findOne(id: string) {
    const participation = await this.prisma.participation.findUnique({
      where: { id },
    });

    if (!participation) {
      throw new NotFoundException(`Participation with id ${id} not found`);
    }

    return participation;
  }

  async update(id: string, updateParticipationDto: UpdateParticipationDto) {
    const participation = await this.prisma.participation.findUnique({
      where: { id },
    });

    if (!participation) {
      throw new NotFoundException(`Participation with id ${id} not found`);
    }

    return this.prisma.participation.update({
      where: { id },
      data: updateParticipationDto,
    });
  }

  async remove(id: string) {
    const participation = await this.prisma.participation.findUnique({
      where: { id },
    });

    if (!participation) {
      throw new NotFoundException(`Participation with id ${id} not found`);
    }

    return this.prisma.participation.delete({ where: { id } });
  }
}
