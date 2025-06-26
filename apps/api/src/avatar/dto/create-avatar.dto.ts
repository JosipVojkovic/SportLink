import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { AvatarGender, AvatarSkinColor } from 'generated/prisma';

export class CreateAvatarDto {
  @ApiProperty({
    description: 'Avatar skin color',
    enum: AvatarSkinColor,
    example: AvatarSkinColor.WHITE,
  })
  @IsEnum(AvatarSkinColor)
  skinColor: AvatarSkinColor;

  @ApiProperty({
    description: 'Avatar gender',
    enum: AvatarGender,
    example: AvatarGender.MALE,
  })
  @IsEnum(AvatarGender)
  gender: AvatarGender;

  @ApiProperty({
    description: 'User ID in UUID format',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID('all', { message: 'User ID must be a valid UUID' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;
}
