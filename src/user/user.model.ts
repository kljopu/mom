import * as bcrypt from "bcrypt"
import { BaseModel } from '../shared/base.model';
import { Column, Entity, BeforeInsert, OneToMany, OneToOne } from 'typeorm';
import { InternalServerErrorException, BadRequestException } from "@nestjs/common";
import { IsEmail } from "class-validator"
import { Gender } from "../shared/utill/gender"
import { Mom } from "src/mom/mom.model";
import { Sitter } from "src/sitter/sitter.model";

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

    @Column("enum", { enum: Gender, nullable: true })
    public gender!: Gender

    @Column("enum", { enum: UserRole, nullable: true })
    public role: UserRole

    @OneToOne(() => Mom, mom => mom.user)
    mom: Mom

    @OneToOne(() => Sitter, sitter => sitter.user)
    sitter: Sitter

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

    @BeforeInsert()
    async checkReg(): Promise<void> {
        var regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        if (!regex.test(this.password)) {
            throw new BadRequestException('Invalid RegExp')
        }
    }
}

