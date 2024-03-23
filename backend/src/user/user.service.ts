import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

interface ClientData {
    [userId: number]: { socketId: string;};
  }

@Injectable()
export class UserService
{
    private readonly prisma: PrismaClient;
    public clients: ClientData = {};
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
                    picture   :true,
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

    async findOrCreateGoogleUser(profile: any) {
        try
        {
          const { id, displayName, emails } = profile;
          const photo = await profile.photos[0].value;

          let user = await this.prisma.user.findUnique({
            where: {
              googleId: id,
            },
          });

          let check = await this.prisma.user.findUnique({
            where: {
              email: emails[0]?.value,
            },
          });
          if (check) {
            emails[0].value = emails[0].value + id;
          }
      
          if (!user) {
            const random = Math.floor(Math.random() * 1000000);
            const res = random.toString();
            const pw = await bcrypt.hash(res, 10);
            user = await this.prisma.user.create({
              data: {
                googleId: id,
                name: displayName,
                email: emails[0]?.value || id,
                password: pw,
                picture: photo
              },
            });
          }
          return user;
        }
        catch (error)
        {
          return null;
        }
      }
}
