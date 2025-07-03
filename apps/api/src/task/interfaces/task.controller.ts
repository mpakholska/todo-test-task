import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskUseCase } from '../application/use-cases/create-task.usecase';
import { CreateTaskDto } from '../application/dto/create-task.dto';
import { GetAllTasksUseCase } from '../application/use-cases/get-all-tasks.usecase';

@Controller('task')
export class TaskController {
  constructor(
    private readonly createTask: CreateTaskUseCase,
    private readonly getAllTasks: GetAllTasksUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    await this.createTask.execute(dto.title, dto.description);
    return { message: 'Task created success fully' };
  }

  @Get()
  async get() {
    return this.getAllTasks.execute();
  }
}
