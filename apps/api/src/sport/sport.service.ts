import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SportService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(createSportDto: CreateSportDto) {
    return this.prisma.sport.create({ data: createSportDto });
  }

  async findAll() {
    return this.prisma.sport.findMany();
  }

  async findOne(id: string) {
    const sport = await this.prisma.sport.findUnique({ where: { id } });

    if (!sport) {
      throw new NotFoundException(`Sport with id ${id} not found`);
    }

    return sport;
  }

  async update(id: string, updateSportDto: UpdateSportDto) {
    const sport = await this.prisma.sport.findUnique({ where: { id } });

    if (!sport) {
      throw new NotFoundException(`Sport with id ${id} not found`);
    }

    return this.prisma.sport.update({ where: { id }, data: updateSportDto });
  }

  async remove(id: string) {
    const sport = await this.prisma.sport.findUnique({ where: { id } });

    if (!sport) {
      throw new NotFoundException(`Sport with id ${id} not found`);
    }

    return this.prisma.sport.delete({ where: { id } });
  }
}
