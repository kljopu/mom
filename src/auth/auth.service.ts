import { Injectable, BadRequestException, InternalServerErrorException, Inject, forwardRef } from '@nestjs/common';
import { UserService } from "../user/user.service"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) { }

    async validateUser(clientId: string, password: string): Promise<any> {
        const user = await this.userService.findByClientId(clientId)
        if (!user.checkPassword(password)) {
            throw new BadRequestException("Password Not Matched")
        }
        return user
    }

    async login(input: any) {
        try {
            const { clientId, password } = input
            const user = await this.userService.findByClientId(clientId)
            if (!user.checkPassword(password)) {
                return {
                    ok: false,
                    error: "Invalid Password"
                }
            }
            const payload = { id: user.id, clientId: user.clientId };
            return {
                ok: true,
                access_token: this.jwtService.sign(payload)
            }
        } catch (error) {
            console.log(error.message);
            throw new InternalServerErrorException()
        }
    }
}
