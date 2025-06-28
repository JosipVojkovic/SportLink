import { Injectable } from '@nestjs/common';
import { CreateOwnedItemDto } from './dto/create-owned-item.dto';
import { UpdateOwnedItemDto } from './dto/update-owned-item.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OwnedItemService {
  constructor(private readonly prisma: PrismaService) {}
  create(createOwnedItemDto: CreateOwnedItemDto) {
    return this.prisma.ownedItem.create({
      data: createOwnedItemDto,
    });
  }

  findAll() {
    return this.prisma.ownedItem.findMany();
  }

  findOne(id: string) {
    return this.prisma.ownedItem.findUnique({
      where: { id },
    });
  }

  update(id: string, updateOwnedItemDto: UpdateOwnedItemDto) {
    return this.prisma.ownedItem.update({
      where: { id },
      data: updateOwnedItemDto,
    });
  }

  remove(id: string) {
    return this.prisma.ownedItem.delete({
      where: { id },
    });
  }
}
