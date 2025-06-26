import { PartialType } from '@nestjs/mapped-types';
import { CreateOwnedItemDto } from './create-owned-item.dto';

export class UpdateOwnedItemDto extends PartialType(CreateOwnedItemDto) {}
