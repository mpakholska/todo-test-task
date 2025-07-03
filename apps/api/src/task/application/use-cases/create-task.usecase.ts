import { TaskRepository } from 'src/task/domain/repositories/task.repository';
import { Task } from 'src/task/domain/entities/task.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('TaskRepository') private readonly repo: TaskRepository,
  ) {}

  async execute(title: string, description: string): Promise<void> {
    const task = new Task(title, description);
    await this.repo.save(task);
  }
}
