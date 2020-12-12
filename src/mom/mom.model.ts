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

@Entity()
export class Mom extends BaseModel {
    @Column({ type: "text", nullable: false })
    requestContents!: string;

    @OneToMany(() => Child, child => child.mom, { cascade: true })
    children: Child[];

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user!: User

    @Column()
    userId: number;
}

@Entity()
export class Child extends BaseModel {
    @Column({ type: "text", nullable: false })
    name!: string;

    @Column({ type: "timestamp" })
    birthday!: Date

    @Column("enum", { enum: Gender })
    gender!: Gender

    @ManyToOne(() => Mom, mom => mom.children)
    mom: Mom;

    @RelationId((child: Child) => child.mom)
    momId: number;
}