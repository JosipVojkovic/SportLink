import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AvatarService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(createAvatarDto: CreateAvatarDto) {
    return this.prisma.avatar.create({
      data: createAvatarDto,
    });
  }

  async findAll() {
    return this.prisma.avatar.findMany();
  }

  async findOne(id: string) {
    const avatar = await this.prisma.avatar.findUnique({
      where: { id },
    });

    if (!avatar) throw new NotFoundException(`Avatar with id ${id} not found`);

    return avatar;
  }

  async update(id: string, updateAvatarDto: UpdateAvatarDto) {
    const avatar = await this.prisma.avatar.findUnique({
      where: { id },
    });

    if (!avatar) throw new NotFoundException(`Avatar with id ${id} not found`);

    return this.prisma.avatar.update({
      where: { id },
      data: updateAvatarDto,
    });
  }

  async remove(id: string) {
    const avatar = await this.prisma.avatar.findUnique({
      where: { id },
    });

    if (!avatar) throw new NotFoundException(`Avatar with id ${id} not found`);

    return this.prisma.avatar.delete({
      where: { id },
    });
  }
}
