import { Test, TestingModule } from '@nestjs/testing';
import { OwnedItemController } from './owned-item.controller';
import { OwnedItemService } from './owned-item.service';

describe('OwnedItemController', () => {
  let controller: OwnedItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnedItemController],
      providers: [OwnedItemService],
    }).compile();

    controller = module.get<OwnedItemController>(OwnedItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
