import { TaskOrmEntity } from 'src/task/infrastructure/persistance/task-typeorm.entity';
import { DataSource } from 'typeorm';
import { Migration1751464623765 } from './migrations/1751464623765-migration';
import { config } from '../config/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: config.db.type as never,
        host: config.db.host,
        port: config.db.port,
        username: config.db.username,
        password: config.db.password,
        database: config.db.name,
        entities: [TaskOrmEntity],
        migrations: [Migration1751464623765],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
