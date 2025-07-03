import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../application/dto/user.dto';

@Controller('/auth')
export class AuthController {
    @Post('register')
    async register(@Body() dto: UserDto){

    }

    @Post('login')
    async login(@Body() dto: UserDto){

    }

    @Post('logout')
    async logout(){

    }
}
