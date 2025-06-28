import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOwnedItemDto } from './dto/create-owned-item.dto';
import { UpdateOwnedItemDto } from './dto/update-owned-item.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OwnedItemService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createOwnedItemDto: CreateOwnedItemDto) {
    return this.prisma.ownedItem.create({
      data: createOwnedItemDto,
    });
  }

  async findAll() {
    return this.prisma.ownedItem.findMany();
  }

  async findOne(id: string) {
    const ownedItem = await this.prisma.ownedItem.findUnique({
      where: { id },
    });

    if (!ownedItem) {
      throw new NotFoundException(`OwnedItem with id ${id} not found`);
    }

    return ownedItem;
  }

  async update(id: string, updateOwnedItemDto: UpdateOwnedItemDto) {
    const ownedItem = await this.prisma.ownedItem.findUnique({
      where: { id },
    });

    if (!ownedItem) {
      throw new NotFoundException(`OwnedItem with id ${id} not found`);
    }

    return this.prisma.ownedItem.update({
      where: { id },
      data: updateOwnedItemDto,
    });
  }

  async remove(id: string) {
    const ownedItem = await this.prisma.ownedItem.findUnique({
      where: { id },
    });

    if (!ownedItem) {
      throw new NotFoundException(`OwnedItem with id ${id} not found`);
    }

    return this.prisma.ownedItem.delete({
      where: { id },
    });
  }
}
