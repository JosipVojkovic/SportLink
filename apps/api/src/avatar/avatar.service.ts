import { Injectable } from '@nestjs/common';
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
    return this.prisma.avatar.findUnique({
      where: { id },
    });
  }

  update(id: string, updateAvatarDto: UpdateAvatarDto) {
    return this.prisma.avatar.update({
      where: { id },
      data: updateAvatarDto,
    });
  }

  remove(id: string) {
    return this.prisma.avatar.delete({
      where: { id },
    });
  }
}
