import { Module } from '@nestjs/common';
import { TaskController } from './interfaces/task.controller';
import { CreateTaskUseCase } from './application/use-cases/create-task.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskOrmEntity } from './infrastructure/persistance/task-typeorm.entity';
import { TaskTypeOrmRepository } from './infrastructure/persistance/task-typeorm.repository';
import { GetAllTasksUseCase } from './application/use-cases/get-all-tasks.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TaskOrmEntity])],
  controllers: [TaskController],
  providers: [
    { provide: 'TaskRepository', useClass: TaskTypeOrmRepository },
    CreateTaskUseCase,
    GetAllTasksUseCase,
  ],
  exports: [TypeOrmModule],
})
export class TaskModule {}
