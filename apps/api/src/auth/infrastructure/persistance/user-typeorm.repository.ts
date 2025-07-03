import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  SafeUser,
  UserRepository,
} from 'src/auth/domain/repositories/user.repository';
import { UserOrmEntity } from './user-typeorm.entity';
import { FetchedUser, User } from 'src/auth/domain/entities/user.entity';

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<User>,
  ) {}

  async save(user: User): Promise<void> {
    const orm = this.repo.create({ ...user });
    await this.repo.save(orm);
  }

  async findAll(): Promise<SafeUser[]> {
    const users = await this.repo.find();
    return users.map((t) => new FetchedUser(t.login));
  }

  async findOne(login: string): Promise<User | null> {
    const user = await this.repo.findOne({ where: { login } });
    return user;
  }
}
