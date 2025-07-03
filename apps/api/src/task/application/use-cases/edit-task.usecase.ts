import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from 'src/task/domain/repositories/task.repository';
import { EditTaskDto } from '../dto/edit-task.dto';

@Injectable()
export class EditTaskUseCase {
  constructor(
    @Inject('TaskRepository') private readonly repo: TaskRepository,
  ) {}

  async execute(dto: EditTaskDto) {
    const task = await this.repo.findById(dto.id);

    if (!task) {
      throw new NotFoundException(`Task with id ${dto.id} not found`);
    }

    if (dto.title !== undefined) {
      task.title = dto.title;
    }
    if (dto.description !== undefined) {
      task.description = dto.description;
    }

    if (dto.completed !== undefined) {
      task.completed = dto.completed;
    }

    await this.repo.save(task);

    return { message: 'Task edited successfully' };
  }
}
