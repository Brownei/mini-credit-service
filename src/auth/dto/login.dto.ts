import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: "string",
    required: true,
    minLength: 3
  })
  @IsString()
  username: string

  @ApiProperty({
    type: "string",
    required: true,
    minLength: 3
  })
  @IsString()
  password: string
}
