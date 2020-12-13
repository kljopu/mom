import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport"
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module"
import { LocalStrategy } from "./local.strategy"
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "./jwt.strategy"
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5h' }
    })
  ],
  providers: [AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [PassportModule, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
