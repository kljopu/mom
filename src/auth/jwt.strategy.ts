import { User } from "../user/user.model"
import { jwtConstants } from "./constants"
import { UserService } from "../user/user.service"
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(payload: any): Promise<User> {
        try {
            const clientId = payload.clientId;
            const user: User = await this.userService.findByClientId(clientId);
            if (!user) {
                throw new UnauthorizedException()
            }
            return user;
        } catch (error) {
            throw new UnauthorizedException('Unauthorized');
        }
    }
}