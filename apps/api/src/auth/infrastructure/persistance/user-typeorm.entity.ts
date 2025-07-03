import { TaskOrmEntity } from 'src/task/infrastructure/persistance/task-typeorm.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('user')
export class UserOrmEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @ManyToMany(() => TaskOrmEntity, (task) => task.users)
  @JoinTable({
    name: 'user_tasks',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'task_id',
      referencedColumnName: 'id',
    },
  })
  tasks: TaskOrmEntity[];
}
