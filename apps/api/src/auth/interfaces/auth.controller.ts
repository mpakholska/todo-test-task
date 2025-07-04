import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserDto } from '../application/dto/user.dto';
import { RegisterUserUseCase } from '../application/usecases/register-user.usecase';
import { Response } from 'express';
import { LoginUserUseCase } from '../application/usecases/login-user.usecase';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUserUseCase,
  ) {}

  @Post('register')
  async register(
    @Body() dto: UserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.registerUser.execute(dto);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000,
    });
    return { token };
  }

  @Post('login')
  async login(@Body() dto: UserDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.loginUser.execute(dto);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000,
    });
    return { token };
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
    });
    return { message: 'User logged out successfully' };
  }
}
