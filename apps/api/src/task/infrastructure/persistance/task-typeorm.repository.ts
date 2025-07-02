import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from 'src/task/domain/repositories/task.repository';
import { Repository } from 'typeorm';
import { TaskOrmEntity } from './task-typeorm.entity';
import { Task } from 'src/task/domain/entities/task.entity';

@Injectable()
export class TaskTypeOrmRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskOrmEntity)
    private readonly repo: Repository<TaskOrmEntity>,
  ) {}

  async save(task: Task): Promise<void> {
    const orm = this.repo.create({ ...task });
    await this.repo.save(orm);
  }

  async findAll(): Promise<Task[]> {
    const todos = await this.repo.find();
    return todos.map(
      (t) => new Task(t.id, t.title, t.description, t.completed),
    );
  }
}
