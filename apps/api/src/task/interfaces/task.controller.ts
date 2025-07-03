import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateTaskUseCase } from '../application/use-cases/create-task.usecase';
import { CreateTaskDto } from '../application/dto/create-task.dto';
import { GetAllTasksUseCase } from '../application/use-cases/get-all-tasks.usecase';
import { AuthGuard } from 'src/auth/infrastructure/guards/auth.guard';

@Controller('task')
export class TaskController {
  constructor(
    private readonly createTask: CreateTaskUseCase,
    private readonly getAllTasks: GetAllTasksUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() dto: CreateTaskDto) {
    await this.createTask.execute(dto.title, dto.description);
    return { message: 'Task created success fully' };
  }

  @Get()
  @UseGuards(AuthGuard)
  async get() {
    return this.getAllTasks.execute();
  }
}
