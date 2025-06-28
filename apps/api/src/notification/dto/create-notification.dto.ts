import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { NotificationType } from 'generated/prisma';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Type of the notification',
    example: NotificationType.PARTICIPATION_ACCEPTED,
  })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty({
    description: 'Message content of the notification',
    example: 'Your participation has been accepted.',
  })
  @IsNotEmpty({ message: 'Message is required' })
  @IsString({ message: 'Message must be a string' })
  message: string;

  @ApiProperty({
    description: 'User ID of the notification recipient',
    example: 'user-123',
  })
  @IsUUID('all', { message: 'User ID must be a valid UUID' })
  userId: string;

  @ApiProperty({
    description: 'Game ID associated with the notification',
    example: 'game-456',
  })
  @IsUUID('all', { message: 'Game ID must be a valid UUID' })
  gameId: string;
}
