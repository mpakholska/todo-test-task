import { Inject, Injectable } from '@nestjs/common';
import { Task } from 'src/task/domain/entities/task.entity';
import { TaskRepository } from 'src/task/domain/repositories/task.repository';

@Injectable()
export class GetAllTasksUseCase {
  constructor(
    @Inject('TaskRepository') private readonly repo: TaskRepository,
  ) {}

  async execute(): Promise<Task[]> {
    const tasks = await this.repo.findAll();
    return tasks;
  }
}
