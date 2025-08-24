import { Injectable, Logger, LoggerService, NotFoundException } from '@nestjs/common';
import { Decimal } from 'generated/prisma/runtime/library';
import { PrismaService } from 'src/helpers/prisma.service';

@Injectable()
export class InsightsService {
  private readonly logger = new Logger(InsightsService.name);

  constructor(
    private dbService: PrismaService,
  ) { }

  async computeInsights(userId: number) {
    const date = new Date()
    const period = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const existingStatement = await this.dbService.statement.findFirst({
      where: {
        userId,
        period
      }
    })

    if (!existingStatement) {
      this.logger.log("Creating mock insights......")

      const avgIncome = 10000;
      const inflow = new Decimal(0.0);
      const outflow = new Decimal(0.0);
      const net = inflow.minus(outflow);
      const bucketList = ["food", "rent", "misc"]
      const buckets = { food: 1200, rent: 2000, misc: 1000 };
      const riskFlags = ['HIGH_SPENDING_RATIO'];
      const parsingSuccessRate = 0.95;

      const newInsight = await this.dbService.insight.create({
        data: {
          userId,
          avgIncome,
          inflow,
          outflow,
          net,
          riskFlags: riskFlags[0],
          parsingSuccessRate
        }
      })

      bucketList.forEach(async (bucket) => {
        await this.dbService.insightBuckets.create({
          data: {
            name: bucket,
            price: buckets[bucket],
            insightId: newInsight.id
          }
        })
      })

      return newInsight;
    }

    const avgIncome = 10000;
    const inflow = new Decimal(existingStatement!.inflow);
    const outflow = new Decimal(existingStatement!.outflow);
    const net = inflow.minus(outflow);
    const bucketList = ["food", "rent", "misc"]
    const buckets = { food: 1200, rent: 2000, misc: 1000 };
    const riskFlags = ['HIGH_SPENDING_RATIO'];
    const parsingSuccessRate = 0.95;

    const newInsight = await this.dbService.insight.create({
      data: {
        userId,
        avgIncome,
        inflow,
        outflow,
        net,
        riskFlags: riskFlags[0],
        parsingSuccessRate
      }
    })

    bucketList.forEach(async (bucket) => {
      await this.dbService.insightBuckets.create({
        data: {
          name: bucket,
          price: buckets[bucket],
          insightId: newInsight.id
        }
      })
    })

    return newInsight;
  }

  async getInsightById(id: number, userId: number) {
    const existingInsight = await this.dbService.insight.findUnique({
      where: {
        id,
        userId
      }
    })

    if (!existingInsight) {
      throw new NotFoundException("This insight is not found")
    }

    return existingInsight;
  }
}
