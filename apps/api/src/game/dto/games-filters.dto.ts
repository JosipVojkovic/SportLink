import { ApiProperty } from '@nestjs/swagger';
import { GameEnvironment, GameSurface } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GamesFiltersDto {
  @ApiProperty({
    description: 'Start date to filter by',
    example: '2023-10-01T15:00:00Z',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid date' })
  startDate?: Date;

  @ApiProperty({
    description: 'End date to filter by',
    example: '2023-10-01T16:00:00Z',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Date must be a valid date' })
  endDate?: Date;

  @ApiProperty({
    description: 'List of sports to filter by',
    example: ['Football', 'Basketball'],
    isArray: true,
    required: false,
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true, message: 'Each sport must be a string' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  sports?: string[];

  @ApiProperty({
    description: 'Max price to filter by',
    example: 10.0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Max price must be a number' })
  maxPrice?: number;

  @ApiProperty({
    description: 'Min price to filter by',
    example: 0.0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Min price must be a number' })
  minPrice?: number;

  @ApiProperty({
    description: 'List of environments to filter by',
    example: [GameEnvironment.INDOOR, GameEnvironment.OUTDOOR],
    isArray: true,
    required: false,
  })
  @IsArray()
  @IsOptional()
  @IsEnum(GameEnvironment, { each: true, message: 'Invalid environment value' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  environment?: GameEnvironment[];

  @ApiProperty({
    description: 'List of surfaces to filter by',
    example: [GameSurface.TURF, GameSurface.CONCRETE],
    isArray: true,
    required: false,
  })
  @IsArray()
  @IsOptional()
  @IsEnum(GameSurface, { each: true, message: 'Invalid surface value' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  surface?: GameSurface[];
}
