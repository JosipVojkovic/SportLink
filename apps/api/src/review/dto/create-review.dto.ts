import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Skill rating given by the reviewer',
    example: 4.5,
  })
  @IsNumber({}, { message: 'Skill rating must be a number' })
  skillRating: number;

  @ApiProperty({
    description: 'Sportsmanship rating given by the reviewer',
    example: 4.0,
  })
  @IsNumber({}, { message: 'Sportsmanship rating must be a number' })
  sportsmanshipRating: number;

  @ApiProperty({
    description: 'Comment provided by the reviewer',
    example: 'Great player, very sportsmanlike!',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Comment must be a string' })
  comment?: string;

  @ApiProperty({
    description: 'ID of the reviewer',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('all', { message: 'Reviewer ID must be a valid UUID' })
  reviewerId: string;

  @ApiProperty({
    description: 'ID of the reviewee',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID('all', { message: 'Reviewee ID must be a valid UUID' })
  revieweeId: string;

  @ApiProperty({
    description: 'ID of the game being reviewed',
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  @IsUUID('all', { message: 'Game ID must be a valid UUID' })
  gameId: string;
}
