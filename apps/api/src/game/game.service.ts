import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}
  create(createGameDto: CreateGameDto) {
    return this.prisma.game.create({
      data: createGameDto,
    });
  }

  findAll() {
    return this.prisma.game.findMany();
  }

  findOne(id: string) {
    const game = this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) throw new NotFoundException(`Game with id ${id} not found`);

    return game;
  }

  update(id: string, updateGameDto: UpdateGameDto) {
    const game = this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) throw new NotFoundException(`Game with id ${id} not found`);

    return this.prisma.game.update({
      where: { id },
      data: updateGameDto,
    });
  }

  remove(id: string) {
    const game = this.prisma.game.findUnique({
      where: { id },
    });

    if (!game) throw new NotFoundException(`Game with id ${id} not found`);

    return this.prisma.game.delete({
      where: { id },
    });
  }
}
