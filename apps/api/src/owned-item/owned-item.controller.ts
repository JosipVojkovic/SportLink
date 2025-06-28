import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OwnedItemService } from './owned-item.service';
import { CreateOwnedItemDto } from './dto/create-owned-item.dto';
import { UpdateOwnedItemDto } from './dto/update-owned-item.dto';

@Controller('owned-item')
export class OwnedItemController {
  constructor(private readonly ownedItemService: OwnedItemService) {}

  @Post()
  create(@Body() createOwnedItemDto: CreateOwnedItemDto) {
    return this.ownedItemService.create(createOwnedItemDto);
  }

  @Get()
  findAll() {
    return this.ownedItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownedItemService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOwnedItemDto: UpdateOwnedItemDto,
  ) {
    return this.ownedItemService.update(id, updateOwnedItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownedItemService.remove(id);
  }
}
