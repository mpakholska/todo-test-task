import { registerAs } from '@nestjs/config';

import { TaskOrmEntity } from '../../task/infrastructure/persistance/task-typeorm.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from '../config/config';
import { Migration1751467533388 } from './migrations/1751467533388-migration';

const configuration = {
  type: config.db.type,
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  entities: [TaskOrmEntity],
  migrations: [Migration1751467533388],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(
  configuration as DataSourceOptions,
);
