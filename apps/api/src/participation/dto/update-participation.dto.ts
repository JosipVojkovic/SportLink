import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ParticipationStatus } from 'generated/prisma';

export class UpdateParticipationDto {
  @ApiProperty({
    description: 'Status of the participation',
    example: ParticipationStatus.PENDING,
  })
  @IsEnum(ParticipationStatus)
  status: ParticipationStatus;
}
