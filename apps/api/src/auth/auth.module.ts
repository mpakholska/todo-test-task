import { Module } from '@nestjs/common';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [TaskModule],
  controllers: [],
})
export class AuthModule {}
