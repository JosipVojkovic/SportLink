import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateGameDto } from './create-game.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { GameStatus } from 'generated/prisma';

export class UpdateGameDto extends PartialType(
  OmitType(CreateGameDto, ['organizerId'] as const),
) {
  @ApiProperty({
    description: 'Status of the game',
    example: GameStatus.SCHEDULED,
  })
  @IsOptional()
  @IsEnum(GameStatus)
  status: GameStatus;
}
