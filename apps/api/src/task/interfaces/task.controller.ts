import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateTaskUseCase } from '../application/use-cases/create-task.usecase';
import { CreateTaskDto } from '../application/dto/create-task.dto';
import { GetAllTasksUseCase } from '../application/use-cases/get-all-tasks.usecase';
import { AuthGuard } from 'src/auth/infrastructure/guards/auth.guard';
import { EditTaskUseCase } from '../application/use-cases/edit-task.usecase';
import { EditTaskDto } from '../application/dto/edit-task.dto';
import { AssignTaskUseCase } from '../application/use-cases/assign-task.usecase';

@Controller('task')
export class TaskController {
  constructor(
    private readonly createTask: CreateTaskUseCase,
    private readonly getAllTasks: GetAllTasksUseCase,
    private readonly editTask: EditTaskUseCase,
    private readonly assignTask: AssignTaskUseCase,
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

  @Post('/edit')
  @UseGuards(AuthGuard)
  async edit(@Body() dto: EditTaskDto) {
    return this.editTask.execute(dto);
  }

  @Post('/assign')
  @UseGuards(AuthGuard)
  async assign(@Body() dto: { taskId: number; login: string }) {
    return this.assignTask.execute(dto.taskId, dto.login);
  }
}
