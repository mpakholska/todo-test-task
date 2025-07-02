
import { TaskOrmEntity } from 'src/task/infrastructure/persistance/task-typeorm.entity';
import { DataSource } from 'typeorm';
import { Migration1751464623765 } from './migrations/1751464623765-migration';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "postgres",
        host: 'localhost',
        port: 5433,
        username: 'admin',
        password: 'Appex@oft121',
        database: 'admin',
        entities: [TaskOrmEntity],
        migrations: [Migration1751464623765],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
