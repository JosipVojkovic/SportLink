import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateOwnedItemDto {
  @ApiProperty({
    description: 'User ID of the owner of the item',
    example: 'user-123',
  })
  @IsUUID('all', { message: 'User ID must be a valid UUID' })
  userId: string;

  @ApiProperty({
    description: 'ID of the item being owned',
    example: 'item-456',
  })
  @IsUUID('all', { message: 'Item ID must be a valid UUID' })
  itemId: string;
}
