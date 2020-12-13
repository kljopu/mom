import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(clientId: string, password: string): Promise<any> {
        try {
            const user = await this.authService.validateUser(clientId, password);
            if (!user) {
                throw new UnauthorizedException();
            }
            return user;

        } catch (error) {
            throw new InternalServerErrorException("Internal Server Exception");
        }
    }
}