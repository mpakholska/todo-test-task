import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
