import { forwardRef, Module } from '@nestjs/common';
import { TaskController } from './interfaces/task.controller';
import { CreateTaskUseCase } from './application/use-cases/create-task.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskOrmEntity } from './infrastructure/persistance/task-typeorm.entity';
import { TaskTypeOrmRepository } from './infrastructure/persistance/task-typeorm.repository';
import { GetAllTasksUseCase } from './application/use-cases/get-all-tasks.usecase';
import { AuthModule } from 'src/auth/auth.module';
import { EditTaskUseCase } from './application/use-cases/edit-task.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskOrmEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [TaskController],
  providers: [
    { provide: 'TaskRepository', useClass: TaskTypeOrmRepository },
    CreateTaskUseCase,
    GetAllTasksUseCase,
    EditTaskUseCase,
  ],
  exports: [TypeOrmModule],
})
export class TaskModule {}
