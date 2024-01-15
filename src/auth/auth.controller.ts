import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    login(@Body() body: AuthDto) {
        return this.authService.login(body.username, body.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/register')
    register(@Body() body: AuthDto) {
        return this.authService.register(body.username, body.password);
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/delete')
    delete(@Req() request: Request) {
        const username = request['user']?.username;
        return this.authService.deleteUser(username);
    }

}
