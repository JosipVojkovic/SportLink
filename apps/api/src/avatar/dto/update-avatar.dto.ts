import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateAvatarDto } from './create-avatar.dto';

export class UpdateAvatarDto extends PartialType(
  OmitType(CreateAvatarDto, ['userId'] as const),
) {}
