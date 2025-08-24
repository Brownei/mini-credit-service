import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HelpersModule } from '../helpers/helpers.module';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule, HelpersModule],
      controllers: [HealthController],
      providers: [],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should return health status', async () => {
    expect(await controller.check()).toEqual({ "details": { "prisma": { "status": "up" } }, "error": {}, "info": { "prisma": { "status": "up" } }, "status": "ok" });
  });
});

