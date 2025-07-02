import { TaskRepository } from 'src/task/domain/repositories/task.repository';
import { Task } from 'src/task/domain/entities/task.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly repo: TaskRepository) {}

  async execute(title: string): Promise<void> {
    const task = new Task('221', title);
    const response = await this.repo.save(task);
    console.log('response', response);
  }
}
