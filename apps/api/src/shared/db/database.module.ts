import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config/config';
import { TaskOrmEntity } from '../../task/infrastructure/persistance/task-typeorm.entity';
import { UserOrmEntity } from '../../auth/infrastructure/persistance/user-typeorm.entity';
import { Migration1751538377150 } from './migrations/1751538377150-migration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.db.type as any,
      host: config.db.host,
      port: config.db.port,
      username: config.db.username,
      password: config.db.password,
      database: config.db.name,
      entities: [TaskOrmEntity, UserOrmEntity],
      migrations: [Migration1751538377150],
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
