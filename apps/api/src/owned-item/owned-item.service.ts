import { Injectable } from '@nestjs/common';
import { CreateOwnedItemDto } from './dto/create-owned-item.dto';
import { UpdateOwnedItemDto } from './dto/update-owned-item.dto';

@Injectable()
export class OwnedItemService {
  create(createOwnedItemDto: CreateOwnedItemDto) {
    return 'This action adds a new ownedItem';
  }

  findAll() {
    return `This action returns all ownedItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ownedItem`;
  }

  update(id: number, updateOwnedItemDto: UpdateOwnedItemDto) {
    return `This action updates a #${id} ownedItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} ownedItem`;
  }
}
