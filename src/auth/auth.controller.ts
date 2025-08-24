import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ApiOperation } from '@nestjs/swagger';
import { CurrentUser } from './gaurd/auth.gaurd';
import { RolesGuard } from './gaurd/roles.gaurd';
import { Role, Roles } from './gaurd/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: "JWT-based login" })
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: "User registration" })
  @Post('/register')
  register(@Body() registerDto: RegisterDTO) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: "Admin can create a user" })
  @Post('/create/user')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  createAUser(@Body() registerDto: RegisterDTO) {
    return this.authService.createAUser(registerDto);
  }
}
