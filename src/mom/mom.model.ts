import {
    Column,
    Entity,
    OneToMany,
    ManyToOne,
    OneToOne,
    JoinColumn,
    RelationId
} from 'typeorm';
import { BaseModel } from '../shared/base.model';
import { Gender } from "../shared/utill/gender"
import { User } from "../user/user.model"
import { Sitter } from 'src/sitter/sitter.model';

@Entity()
export class Mom extends BaseModel {
    @Column({ type: "text", nullable: true })
    requestContents!: string;

    @OneToMany(() => Child, (child) => child.mom, { cascade: true })
    children: Child[];

    @OneToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'userId' })
    user!: User

    @Column()
    userId: number;

    @Column({ type: 'boolean', default: false })
    isActivate: boolean

    @OneToMany(() => Sitter, (sitters) => sitters.mom)
    sitters?: Sitter[]
}

@Entity()
export class Child extends BaseModel {
    @Column({ type: "text", nullable: true })
    name!: string;

    @Column({ type: "date" })
    birthday!: Date

    @Column("enum", { enum: Gender })
    gender!: Gender

    @ManyToOne(() => Mom, mom => mom.children, { onDelete: "CASCADE" })
    mom: Mom;

    @RelationId((child: Child) => child.mom)
    momId: number;
}