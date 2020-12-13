import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "./user.model"
import { CreateUserOutputDTO, CreateUserInputDTO } from "../auth/dtos/auth.dto"
import { parse } from 'src/shared/utill/date.parser';
import { ProfileOutputDTO } from './dtos/user.output.dto';
import { ProfileInputDTO } from './dtos/user.input.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
    ) {
        console.log("Useing User Repository");
    }

    async createUser(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
        try {
            const { name,
                gender,
                clientId,
                password,
                email } = input
            function parse(str) {
                var y = str.substr(0, 4),
                    m = str.substr(4, 2) - 1,
                    d = str.substr(6, 2);
                return new Date(y, m, d);
            }
            const birthday = parse(input.birthday)
            const exists = await this.users.findOne({ clientId: clientId })

            if (exists) {
                throw new BadRequestException('User already exists')
            }
            const user = await this.users.save(
                this.users.create({ name, clientId, password, email, birthday })
            )
            return { ok: true }
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async findByClientId(clientId: string): Promise<User | undefined> {
        try {
            return this.users.findOne({ clientId: clientId })
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async getProfile(user): Promise<User> {
        try {
            const info = await this.users.findOne({ id: user.id }, { relations: ['mom', 'sitter', 'mom.children'] })
            return info
        } catch (error) {
            return error.response
        }
    }

    async updateBaseProfile(input: ProfileInputDTO, user): Promise<ProfileOutputDTO> {
        try {
            const { name, email, gender } = input
            const birthday = parse(input.birthday)
            user.name = name
            user.email = email
            user.birthday = birthday
            user.gender = gender
            this.users.save(user)
            return {
                ok: true,
                user
            }
        } catch (error) {
            return error.response
        }
    }
}
