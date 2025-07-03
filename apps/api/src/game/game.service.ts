import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class GameService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(createGameDto: CreateGameDto) {
    return this.prisma.game.create({
      data: createGameDto,
    });
  }

  async findAll() {
    return this.prisma.game.findMany();
  }

  async findOne(id: string) {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) throw new NotFoundException(`Game with id ${id} not found`);

    return game;
  }

  async update(id: string, updateGameDto: UpdateGameDto) {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) throw new NotFoundException(`Game with id ${id} not found`);

    return this.prisma.game.update({
      where: { id },
      data: updateGameDto,
    });
  }

  async remove(id: string) {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) throw new NotFoundException(`Game with id ${id} not found`);

    return this.prisma.game.delete({
      where: { id },
    });
  }
}
