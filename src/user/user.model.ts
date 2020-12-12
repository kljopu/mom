import bcrypt from "bcrypt"
import { BaseModel } from '../shared/base.model';
import { Column, Entity, BeforeInsert } from 'typeorm';
import { InternalServerErrorException } from "@nestjs/common";
import { IsEmail } from "class-validator"
import { Gender } from "../shared/utill/gender"

export enum UserRole {
    Mom = "Mom",
    Sitter = "Sitter"
}

@Entity()
export class User extends BaseModel {
    @Column({ type: "text", nullable: false })
    name!: string;

    @Column({ type: "timestamp", nullable: true })
    birthday!: Date;

    @Column({ type: "varchar", nullable: false, unique: true })
    clientId!: string;

    @Column({ type: "text", nullable: false })
    password!: string;

    @IsEmail()
    @Column({ type: "text" })
    email!: string

    @Column("enum", { enum: Gender })
    public gender!: Gender

    @Column("enum", { enum: UserRole })
    public role: UserRole

    // @Column({ type: "boolean", default: false })
    // isMom: boolean

    // @Column({ type: "boolean", default: false })
    // isSitter: boolean

    @BeforeInsert()
    async savePassword(): Promise<void> {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10)
            } catch (error) {
                console.log(error);
                throw new InternalServerErrorException()
            }
        }
    }
    async checkPassword(aPassword: string): Promise<boolean> {
        try {
            const ok = await bcrypt.compare(aPassword, this.password)
            return ok
        } catch (error) {
            console.log("err", error);
            throw new InternalServerErrorException()
        }
    }
}

