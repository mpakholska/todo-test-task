import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config/config';
import { TaskOrmEntity } from 'src/task/infrastructure/persistance/task-typeorm.entity';
import { Migration1751467533388 } from './migrations/1751467533388-migration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.db.type as any,
      host: config.db.host,
      port: config.db.port,
      username: config.db.username,
      password: config.db.password,
      database: config.db.name,
      entities: [TaskOrmEntity],
      migrations: [Migration1751467533388],
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
