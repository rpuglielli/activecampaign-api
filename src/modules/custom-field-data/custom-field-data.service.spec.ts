import { Test, TestingModule } from '@nestjs/testing';

import { CustomFieldDataService } from './custom-field-data.service';

describe('CustomFieldDataService', () => {
  let service: CustomFieldDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomFieldDataService],
    }).compile();

    service = module.get<CustomFieldDataService>(CustomFieldDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
