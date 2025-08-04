import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { DatabaseService } from 'src/database/database.service';
import { GameStatus } from 'generated/prisma';
import { GamesFiltersDto } from './dto/games-filters.dto';

@Injectable()
export class GameService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(createGameDto: CreateGameDto) {
    return this.prisma.game.create({
      data: createGameDto,
    });
  }

  async findAll(filters: GamesFiltersDto) {
    const now = new Date();

    const where: any = {
      status: GameStatus.SCHEDULED,
      date: {
        gt: now,
      },
    };

    if (filters.startDate) {
      where.date = {
        ...where.date,
        gte: filters.startDate,
      };
    }

    if (filters.endDate) {
      where.date = {
        ...where.date,
        lte: filters.endDate,
      };
    }

    if (filters.minPrice !== undefined) {
      where.price = {
        ...(where.price ?? {}),
        gte: filters.minPrice,
      };
    }

    if (filters.maxPrice !== undefined) {
      where.price = {
        ...(where.price ?? {}),
        lte: filters.maxPrice,
      };
    }

    if (filters.sports && filters.sports.length > 0) {
      where.sport = {
        name: {
          in: filters.sports,
        },
      };
    }

    if (filters.environment && filters.environment.length > 0) {
      where.environment = {
        in: filters.environment,
      };
    }

    if (filters.surface && filters.surface.length > 0) {
      where.surface = {
        in: filters.surface,
      };
    }

    const games = await this.prisma.game.findMany({
      where,
      include: {
        sport: {
          select: {
            name: true,
          },
        },
      },
    });

    return games;
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
