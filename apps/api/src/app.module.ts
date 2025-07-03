import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/db/database.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, TaskModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
