import { Body, Controller , Get, Post, Req, Request, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { BlacklistService } from './blacklist.service';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController
{
    constructor (private authService: AuthService, private blacklistService : BlacklistService) {}

    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Request() req, @Res({ passthrough: true }) res: Response) {
        const user : any = await this.authService.login(req.user);
        // Set the access token as a cookie
        res.cookie('access_token', user.access_token, { httpOnly: true });

        return user;
    }

    @Post('signup')
    async signup(@Body() body: any)
    {
        const { email, name, password } = body;
        await this.authService.signup(email, name, password);
        return { message: 'signup successful' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('protected')
    async protectedRoute(@Request() req)
    {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Req() req) {
        const accessToken = req.headers.authorization.split(' ')[1]; // Extracting token from Authorization header
        this.blacklistService.addToBlacklist(accessToken);
        return { message: 'Logout successful' };
    }
}
