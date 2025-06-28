import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SportService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSportDto: CreateSportDto) {
    return this.prisma.sport.create({ data: createSportDto });
  }

  findAll() {
    return this.prisma.sport.findMany();
  }

  findOne(id: string) {
    const sport = this.prisma.sport.findUnique({ where: { id } });

    if (!sport) {
      throw new NotFoundException(`Sport with id ${id} not found`);
    }

    return sport;
  }

  update(id: string, updateSportDto: UpdateSportDto) {
    const sport = this.prisma.sport.findUnique({ where: { id } });

    if (!sport) {
      throw new NotFoundException(`Sport with id ${id} not found`);
    }

    return this.prisma.sport.update({ where: { id }, data: updateSportDto });
  }

  remove(id: string) {
    const sport = this.prisma.sport.findUnique({ where: { id } });

    if (!sport) {
      throw new NotFoundException(`Sport with id ${id} not found`);
    }

    return this.prisma.sport.delete({ where: { id } });
  }
}
