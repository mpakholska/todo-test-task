import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskUseCase } from '../application/use-cases/create-task.usecase';
import { CreateTaskDto } from '../application/dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly createTask: CreateTaskUseCase) {}

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    await this.createTask.execute(dto.title);
    return { message: 'Task created success fully' };
  }
}
