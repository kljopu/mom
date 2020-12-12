import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "./user.model"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
    ) {
        console.log("Useing User Repository");
    }

    async createUser(): Promise<any> {
        try {

        } catch (error) {

        }
    }
}
