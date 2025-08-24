import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Role } from '../gaurd/roles.decorator';

export class RegisterDTO {
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

  @ApiProperty({
    enum: Role,
    required: false,
    example: Role.User
  })
  @IsEnum(Role)
  role?: Role
}
