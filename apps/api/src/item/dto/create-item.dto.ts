import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ItemType } from 'generated/prisma';

export class CreateItemDto {
  @ApiProperty({
    description: 'Name of the item',
    example: 'Soccer Ball',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Description of the item',
    example: 'A high-quality soccer ball for all ages',
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({
    description: 'Type of the item',
    example: ItemType.EXTRA,
  })
  @IsEnum(ItemType)
  type: ItemType;

  @ApiProperty({
    description: 'Price of the item',
    example: 29.99,
  })
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;

  @ApiProperty({
    description: 'Image URL of the item',
    example: 'https://example.com/soccer-ball.jpg',
  })
  @IsNotEmpty({ message: 'Image URL is required' })
  @IsString({ message: 'Image URL must be a string' })
  imageUrl: string;
}
