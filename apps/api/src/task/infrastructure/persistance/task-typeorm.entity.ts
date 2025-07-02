import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tasks')
export class TaskOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  completed: boolean;
}
