import { BadRequestException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from 'src/auth/domain/repositories/user.repository';
import { UserDto } from '../dto/user.dto';
import { config } from 'src/shared/config/config';

export class LoginUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly repo: UserRepository,
  ) {}

  async execute(dto: UserDto) {
    const foundUser = await this.repo.findOne(dto.login);

    if (!foundUser) {
      throw new BadRequestException('User with this login does not exist');
    }

    const isValidPassword = await bcrypt.compare(
      dto.password,
      foundUser.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Wrong password');
    }

    const token = jwt.sign(dto.login, config.jwt.secret);
    return token;
  }
}
