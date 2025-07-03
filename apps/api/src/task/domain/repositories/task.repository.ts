import { Task } from '../entities/task.entity';

export interface TaskRepository {
  save(task: Task): Promise<void>;
  findAll(): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  update(id: number, task: Partial<Task>): Promise<Task | null>;
}
