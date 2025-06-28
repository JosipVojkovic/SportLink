import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { GameStatus } from 'generated/prisma';

export class CreateGameDto {
  @ApiProperty({
    description: 'Title of the game',
    example: 'Friendly Soccer Match',
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty({
    description: 'Description of the game',
    example: 'A friendly match to enjoy the weekend',
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({
    description: 'Date and time of the game',
    example: '2023-10-01T15:00:00Z',
  })
  @IsNotEmpty({ message: 'Date is required' })
  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid date' })
  date: Date;

  @ApiProperty({
    description: 'Duration of the game in minutes',
    example: 90,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Duration must be a number' })
  duration?: number;

  @ApiProperty({
    description: 'Location of the game',
    example: 'Central Park, NYC',
  })
  @IsNotEmpty({ message: 'Location is required' })
  @IsString({ message: 'Location must be a string' })
  location: string;

  @ApiProperty({
    description: 'Latitude of the game location',
    example: 40.7128,
  })
  @IsNumber({}, { message: 'Latitude must be a number' })
  latitude: number;

  @ApiProperty({
    description: 'Longitude of the game location',
    example: -74.006,
  })
  @IsNumber({}, { message: 'Longitude must be a number' })
  longitude: number;

  @ApiProperty({
    description: 'Maximum number of players for the game',
    example: 22,
  })
  @IsNumber({}, { message: 'Max players must be a number' })
  maxPlayers: number;

  @ApiProperty({
    description: 'Current number of players for the game',
    example: 10,
  })
  @IsNumber({}, { message: 'Current players must be a number' })
  currentPlayers: number;

  @ApiProperty({
    description: 'Sport ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID('all', { message: 'Sport ID must be a valid UUID' })
  sportId: string;

  @ApiProperty({
    description: 'Organizer ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID('all', { message: 'Organizer ID must be a valid UUID' })
  organizerId: string;
}
