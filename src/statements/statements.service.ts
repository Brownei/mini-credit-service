import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateStatementDto } from './dto/create-statement.dto';
import { PrismaService } from 'src/helpers/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class StatementsService {
  constructor(
    private dbService: PrismaService,
  ) { }

  async create(id: number, dto: CreateStatementDto) {
    try {
      const { date, description, type, amount, balance } = dto
      //const period = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      const existingUser = await this.dbService.user.findUnique({
        where: {
          id
        }
      })

      if (!existingUser) {
        throw new UnauthorizedException("Unauthorized access")
      }

      const existingStatement = await this.dbService.statement.findFirst({
        where: { userId: id, period: date }
      })

      if (!existingStatement) {
        await Promise.all([
          this.dbService.transaction.create({
            data: {
              amount,
              description,
              userId: id,
              type
            }
          }),

          this.dbService.statement.create({
            data: {
              period: date,
              openingBalance: balance,
              closingBalance: balance,
              userId: id
            }
          }),
        ])

        return;
      }

      let inflow = new Decimal(existingStatement!.inflow)
      let outflow = new Decimal(existingStatement!.outflow)
      let closingBalance = new Decimal(existingStatement!.closingBalance)

      if (type === "CREDIT") {
        inflow = inflow.plus(amount)
        closingBalance = closingBalance.plus(closingBalance)
      } else {
        outflow = outflow.plus(amount)
        closingBalance = closingBalance.minus(amount)
      }

      await this.dbService.statement.update({
        where: {
          id: existingStatement!.id
        },
        data: {
          period: date,
          closingBalance,
          inflow,
          outflow
        }
      })

      return;
    } catch (error) {
      console.log({ error })
      throw new InternalServerErrorException("Somethong happened")
    }
  }
}
