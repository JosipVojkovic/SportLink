import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateNotificationDto {
  @ApiProperty({
    description: 'Read status of the notification',
    example: true,
  })
  @IsBoolean({ message: 'Read status must be a boolean' })
  read: boolean;
}
