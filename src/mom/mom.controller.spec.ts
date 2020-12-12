import { Test, TestingModule } from '@nestjs/testing';
import { MomController } from './mom.controller';

describe('MomController', () => {
  let controller: MomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MomController],
    }).compile();

    controller = module.get<MomController>(MomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
