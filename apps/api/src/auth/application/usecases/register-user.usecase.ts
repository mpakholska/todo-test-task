import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/domain/repositories/user.repository';
import { UserDto } from '../dto/user.dto';
import { User } from 'src/auth/domain/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { config } from 'src/shared/config/config';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly repo: UserRepository,
  ) {}

  async execute(dto: UserDto) {
    const foundUser = await this.repo.findOne(dto.login);

    if (foundUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 4);
    const user = new User(dto.login, hashedPassword);
    await this.repo.save(user);

    const token = jwt.sign(dto.login, config.jwt.secret);
    return token;
  }
}
