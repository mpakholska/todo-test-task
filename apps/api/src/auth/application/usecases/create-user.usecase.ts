import { TaskRepository } from 'src/task/domain/repositories/task.repository';
import { Task } from 'src/task/domain/entities/task.entity';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/domain/repositories/user.repository';
import { User } from 'src/auth/domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('TaskRepository') private readonly repo: UserRepository,
  ) {}

  async execute(login: string, password: string): Promise<void> {
    const user = new User(login, password);
    const response = await this.repo.save(user);
    return response;
  }
}
