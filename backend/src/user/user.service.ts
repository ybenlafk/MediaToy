import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService
{
    private readonly prisma: PrismaClient;
    constructor()
    {
        this.prisma = new PrismaClient();
    }
    async findOne(email: string)
    {
        try
        {
            const user = await this.prisma.user.findUnique({
                where: { email }, 
                select: { 
                    id     : true,  
                    googleId  :true,
                    name     :true, 
                    email    :true, 
                    password  :true,
                    createdAt :true,
                    posts     :true,
                    following :true,
                    followers :true,
                }
            });
            return user;
        }
        catch (error)
        {
            throw error;
        }
    }
}
