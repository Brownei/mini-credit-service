import { Test, TestingModule } from '@nestjs/testing';
import { BureauController } from './bureau.controller';
import { BureauService } from './bureau.service';

describe('BureauController', () => {
  let controller: BureauController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BureauController],
      providers: [BureauService],
    }).compile();

    controller = module.get<BureauController>(BureauController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
