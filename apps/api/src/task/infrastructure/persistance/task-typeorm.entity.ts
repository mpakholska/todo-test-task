import { UserOrmEntity } from '../../../auth/infrastructure/persistance/user-typeorm.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('task')
export class TaskOrmEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  completed: boolean;

  @ManyToMany(() => UserOrmEntity, (user) => user.tasks)
  users: UserOrmEntity[];
}
