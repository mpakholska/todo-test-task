import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('task')
export class TaskOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  completed: boolean;
}
