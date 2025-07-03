import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    return todos.map((t) => new Task(t.title, t.description, t.completed));
  }

  async findById(id: number): Promise<Task | null> {
    const task = await this.repo.findOne({ where: { id } });
    if (!task) return null;
    return new Task(task.title, task.description, task.completed);
  }

  async update(id: number, task: Partial<Task>): Promise<Task | null> {
    const existingTask = await this.repo.findOne({ where: { id } });
    if (!existingTask) return null;

    await this.repo.update(id, task);

    const updatedTask = await this.repo.findOne({ where: { id } });

    if (!updatedTask) {
      throw new InternalServerErrorException('Something went wrong');
    }
    return new Task(
      updatedTask.title,
      updatedTask.description,
      updatedTask.completed,
    );
  }
}
