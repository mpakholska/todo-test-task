import { Controller, Get } from '@nestjs/common';
import { GetAllUsersUseCase } from '../application/usecases/get-all-users.usecase';

@Controller('/users')
export class UserController {
  constructor(private readonly getAllUsersUseCase: GetAllUsersUseCase) {}

  @Get('')
  async getAllUsers() {
    return await this.getAllUsersUseCase.execute();
  }
}
