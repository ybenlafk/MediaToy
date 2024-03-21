import { ConflictException, ForbiddenException, Injectable,UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService 
{
    private readonly prisma : PrismaClient;
    constructor (private jwtService: JwtService, private userService: UserService) 
    {
        this.prisma = new PrismaClient();
    }

    async signup(email: string, name: string, password: string)
    {
        if (!email || !password || !name) {
            throw new ConflictException('Missing credentials');
        }
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (user) {
            throw new ConflictException('Email already taken');
        }
        const newUser = await this.prisma.user.create({
            data: {
                email,
                name,
                password: await this.hashPassword(password)
            }
        });
        
        return newUser;
    }
    
    async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> 
    {
      return bcrypt.compare(plainPassword, hashedPassword);
    }
    
    async hashPassword(password: string): Promise<string> {
      return bcrypt.hash(password, 10);
    }

    async login(user: any)
    {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
