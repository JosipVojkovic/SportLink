import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AvatarService {
  constructor(private readonly prisma: PrismaService) {}
  create(createAvatarDto: CreateAvatarDto) {
    return this.prisma.avatar.create({
      data: createAvatarDto,
    });
  }

  findAll() {
    return this.prisma.avatar.findMany();
  }

  findOne(id: string) {
    const avatar = this.prisma.avatar.findUnique({
      where: { id },
    });

    if (!avatar) throw new NotFoundException(`Avatar with id ${id} not found`);

    return avatar;
  }

  update(id: string, updateAvatarDto: UpdateAvatarDto) {
    const avatar = this.prisma.avatar.findUnique({
      where: { id },
    });

    if (!avatar) throw new NotFoundException(`Avatar with id ${id} not found`);

    return this.prisma.avatar.update({
      where: { id },
      data: updateAvatarDto,
    });
  }

  remove(id: string) {
    const avatar = this.prisma.avatar.findUnique({
      where: { id },
    });

    if (!avatar) throw new NotFoundException(`Avatar with id ${id} not found`);

    return this.prisma.avatar.delete({
      where: { id },
    });
  }
}
