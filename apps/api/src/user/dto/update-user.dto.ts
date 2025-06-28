import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from 'generated/prisma';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'Role of the user',
    example: UserRole.ORGANIZER,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    description: 'Points associated with the user',
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Points must be a number' })
  points?: number;
}
