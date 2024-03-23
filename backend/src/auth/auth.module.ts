import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { BlacklistService } from './blacklist.service';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtStrategy } from './strategys/jwt.strategy';
import { GoogleStrategy } from './strategys/google.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: process.env.SECRET, signOptions: { expiresIn: '1w' }})],
  controllers: [AuthController],
  providers: [AuthService, UserService, BlacklistService, LocalStrategy, JwtStrategy, GoogleStrategy]
})
export class AuthModule {}
