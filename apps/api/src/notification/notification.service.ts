import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(createNotificationDto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: createNotificationDto,
    });
  }

  async findAll() {
    return this.prisma.notification.findMany();
  }

  async findOne(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with id ${id} not found`);
    }

    return notification;
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with id ${id} not found`);
    }

    return this.prisma.notification.update({
      where: { id },
      data: updateNotificationDto,
    });
  }

  async remove(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException(`Notification with id ${id} not found`);
    }

    return this.prisma.notification.delete({
      where: { id },
    });
  }
}
