import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateParticipationDto {
  @ApiProperty({
    description: 'User ID of the participant',
    example: 'user-123',
  })
  @IsUUID('all', { message: 'User ID must be a valid UUID' })
  userId: string;

  @ApiProperty({
    description: 'Game ID of the game being participated in',
    example: 'game-456',
  })
  @IsUUID('all', { message: 'Game ID must be a valid UUID' })
  gameId: string;
}
