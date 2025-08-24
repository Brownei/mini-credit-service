import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"

enum Type {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT"
}

export class CreateStatementDto {
  @ApiProperty({
    type: "string",
    required: true,
    example: "2025-06"
  })
  @IsString()
  @IsNotEmpty()
  date: string

  @ApiProperty({
    type: "string",
    required: true,
    example: "Sending money to my mom"
  })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({
    type: "number",
    required: true,
    example: 10000
  })
  @IsNumber()
  amount: number

  @ApiProperty({
    enum: Type,
    required: true,
    example: Type.CREDIT
  })
  @IsEnum(Type)
  type: Type

  @ApiProperty({
    type: "number",
    required: true,
    example: 10000
  })
  @IsNumber()
  balance: number
}
