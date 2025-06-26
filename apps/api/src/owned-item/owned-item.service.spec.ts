import { Test, TestingModule } from '@nestjs/testing';
import { OwnedItemService } from './owned-item.service';

describe('OwnedItemService', () => {
  let service: OwnedItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnedItemService],
    }).compile();

    service = module.get<OwnedItemService>(OwnedItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
