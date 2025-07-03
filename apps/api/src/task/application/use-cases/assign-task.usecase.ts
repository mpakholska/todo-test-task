import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/auth/domain/repositories/user.repository';
import { TaskRepository } from 'src/task/domain/repositories/task.repository';

@Injectable()
export class AssignTaskUseCase {
  constructor(
    @Inject('TaskRepository') private readonly taskRepo: TaskRepository,
    @Inject('UserRepository') private readonly userRepo: UserRepository,
  ) {}

  async execute(taskId: number, login: string): Promise<{ message: string }> {
    const task = await this.taskRepo.findById(taskId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    const user = await this.userRepo.findOne(login);
    if (!user) {
      throw new NotFoundException(`User with Login ${login} not found`);
    }

    const isAlreadyAssigned = task.users?.some((u) => u.login === login);
    if (isAlreadyAssigned) {
      throw new BadRequestException('Task is already assigned to this user');
    }

    if (!task.users) {
      task.users = [];
    }

    task.users.push(user);

    await this.taskRepo.save(task);

    return { message: 'Task assigned successfully' };
  }
}
