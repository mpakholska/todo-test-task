import { Inject, Injectable } from '@nestjs/common';
import {
  SafeUser,
  UserRepository,
} from 'src/auth/domain/repositories/user.repository';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject('UserRepository') private readonly repo: UserRepository,
  ) {}

  async execute(): Promise<SafeUser[]> {
    const users = await this.repo.findAll();
    return users;
  }
}
