import { Task } from "../entities/task.entity";

export interface TaskRepository {
  save(task: Task): Promise<void>;
  findAll(): Promise<Task[]>;
}
