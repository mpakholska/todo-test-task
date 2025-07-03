import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetAllUsersUseCase } from '../application/usecases/get-all-users.usecase';
import { AuthGuard } from '../infrastructure/guards/auth.guard';

@Controller('/users')
export class UserController {
  constructor(private readonly getAllUsersUseCase: GetAllUsersUseCase) {}

  @Get('')
  @UseGuards(AuthGuard)
  async getAllUsers() {
    return await this.getAllUsersUseCase.execute();
  }
}
