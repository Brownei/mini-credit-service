import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
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
    try {
      const existingUser = await this.dbService.user.findUnique({
        where: { username: loginDto.username },

      });

      if (!existingUser) {
        throw new ForbiddenException('No user like this exists');
      }

      const comparePassword = await bcrypt.compare(loginDto.password, existingUser.password)

      if (comparePassword === true) {
        const token = this.jwtService.sign(
          { id: existingUser.id, role: existingUser.role },
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

    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async register(registerDto: RegisterDTO) {
    try {
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
          role: registerDto.role !== undefined ? registerDto.role : "user"
        },
      });

      const token = this.jwtService.sign(
        { id: user.id, role: user.role },
        {
          expiresIn: '1d',
        },
      );

      return {
        message: 'Signup successful',
        access_token: token,
        user_data: user.username,
      }

    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async createAUser(registerDto: RegisterDTO) {
    try {
      const oldUser = await this.dbService.user.findUnique({
        where: { username: registerDto.username },

      });

      if (oldUser) {
        throw new ForbiddenException('A user with this username already exists');
      }

      const hashedPassword = await bcrypt.hash(registerDto.password as string, 10);


      await this.dbService.user.create({
        data: {
          username: registerDto.username,
          password: hashedPassword,
          role: "user"
        },
      });

      return {
        message: 'User has been created',
      }


    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
