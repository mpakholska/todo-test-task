import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from 'src/task/domain/repositories/task.repository';

@Injectable()
export class AssignTaskUseCase {
  constructor(
    @Inject('TaskRepository') private readonly taskRepo: TaskRepository,
  ) {}

  async execute(taskId: number, login: string): Promise<void> {
    const task = await this.taskRepo.findById(taskId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    if (!task.users) {
      throw new Error('Task has no assigned users');
    }

    task.users = task.users.filter((user) => user.login !== login);

    await this.taskRepo.save(task);
  }
}
