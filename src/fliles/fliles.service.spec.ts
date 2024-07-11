import { Test, TestingModule } from '@nestjs/testing';
import { FlilesService } from './fliles.service';

describe('FlilesService', () => {
  let service: FlilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlilesService],
    }).compile();

    service = module.get<FlilesService>(FlilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
