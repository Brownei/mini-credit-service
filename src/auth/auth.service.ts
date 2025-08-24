import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { PrismaService } from 'src/helpers/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private dbService: PrismaService,
    private jwtService: JwtService
  ) { }

  async login(loginDto: LoginDto) {
    const existingUser = await this.dbService.user.findUnique({
      where: { username: loginDto.username },

    });

    if (!existingUser) {
      throw new ForbiddenException('No user like this exists');
    }

    const comparePassword = await bcrypt.compare(loginDto.password, existingUser.password)

    if (comparePassword === true) {
      const token = this.jwtService.sign(
        { id: existingUser.id },
        {
          expiresIn: '1d',
        },
      );

      return {
        message: 'Signin successful',
        access_token: token,
        user_data: existingUser.username,
      }

    }

    throw new ConflictException("Incorrect password")
  }

  async register(registerDto: RegisterDTO) {
    // const firstName = dto.fullName.split(' ')
    const oldUser = await this.dbService.user.findUnique({
      where: { username: registerDto.username },

    });

    if (oldUser) {
      throw new ForbiddenException('A user with this username already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password as string, 10);


    const user = await this.dbService.user.create({
      data: {
        username: registerDto.username,
        password: hashedPassword,
      },
    });

    const token = this.jwtService.sign(
      { id: user.id },
      {
        expiresIn: '1d',
      },
    );

    return {
      message: 'Signup successful',
      access_token: token,
      user_data: user.username,
    }
  }
}
