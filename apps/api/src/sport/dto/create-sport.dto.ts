import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSportDto {
  @ApiProperty({
    description: 'Name of the sport',
    example: 'Basketball',
  })
  @IsNotEmpty({ message: 'Sport name is required' })
  @IsString({ message: 'Sport name must be a string' })
  name: string;

  @ApiProperty({
    description: 'Description of the sport',
    example:
      "A team sport where two teams try to score points by shooting a ball through the opponent's hoop.",
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Sport description must be a string' })
  description?: string;
}
