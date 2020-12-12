import { Test, TestingModule } from '@nestjs/testing';
import { SitterController } from './sitter.controller';

describe('SitterController', () => {
  let controller: SitterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SitterController],
    }).compile();

    controller = module.get<SitterController>(SitterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
