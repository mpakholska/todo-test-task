import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/db/database.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [DatabaseModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
