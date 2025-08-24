import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"

enum Type {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT"
}

export class CreateStatementDto {
  @IsString()
  @IsNotEmpty()
  date: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  amount: number

  @IsEnum(Type)
  type: Type

  @IsNumber()
  balance: number
}
