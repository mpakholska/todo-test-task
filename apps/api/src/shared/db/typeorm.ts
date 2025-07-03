import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from '../config/config';
import { UserOrmEntity } from '../../auth/infrastructure/persistance/user-typeorm.entity';
import { TaskOrmEntity } from '../../task/infrastructure/persistance/task-typeorm.entity';

const configuration = {
  type: config.db.type,
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.name,
  entities: [UserOrmEntity, TaskOrmEntity],
  migrations: [],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => configuration);
export const connectionSource = new DataSource(
  configuration as DataSourceOptions,
);
