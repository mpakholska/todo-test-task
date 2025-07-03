import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from 'src/task/task.module';
import { AuthController } from './interfaces/auth.controller';
import { UserTypeOrmRepository } from './infrastructure/persistance/user-typeorm.repository';
import { UserOrmEntity } from './infrastructure/persistance/user-typeorm.entity';
import { RegisterUserUseCase } from './application/usecases/register-user.usecase';
import { LoginUserUseCase } from './application/usecases/login-user.usecase';

@Module({
  imports: [TaskModule, TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [AuthController],
  providers: [
    { provide: 'UserRepository', useClass: UserTypeOrmRepository },
    RegisterUserUseCase,
    LoginUserUseCase,
  ],
})
export class AuthModule {}
