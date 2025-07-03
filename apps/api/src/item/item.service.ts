import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(createItemDto: CreateItemDto) {
    return this.prisma.item.create({
      data: createItemDto,
    });
  }

  async findAll() {
    return this.prisma.item.findMany();
  }

  async findOne(id: string) {
    const item = await this.prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const item = await this.prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }

  async remove(id: string) {
    const item = await this.prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return this.prisma.item.delete({
      where: { id },
    });
  }
}
