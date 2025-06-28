import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}
  create(createItemDto: CreateItemDto) {
    return this.prisma.item.create({
      data: createItemDto,
    });
  }

  findAll() {
    return this.prisma.item.findMany();
  }

  findOne(id: string) {
    const item = this.prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    return item;
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    const item = this.prisma.item.findUnique({
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

  remove(id: string) {
    const item = this.prisma.item.findUnique({
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
