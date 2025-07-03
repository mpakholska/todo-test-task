import { User } from 'src/auth/domain/entities/user.entity';
import { Task } from '../entities/task.entity';
import { TaskOrmEntity } from 'src/task/infrastructure/persistance/task-typeorm.entity';

export interface TaskRepository {
  save(task: Task): Promise<void>;
  findAll(): Promise<TaskOrmEntity[] | []>;
  findById(id: number): Promise<(Task & { users: User[] }) | null>;
  update(id: number, task: Partial<Task>): Promise<Task | null>;
}
