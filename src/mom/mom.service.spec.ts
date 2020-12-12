import { Test, TestingModule } from '@nestjs/testing';
import { MomService } from './mom.service';

describe('MomService', () => {
  let service: MomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MomService],
    }).compile();

    service = module.get<MomService>(MomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
