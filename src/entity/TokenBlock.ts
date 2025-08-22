import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "./Abstract";
import { User } from "./User";
import { v4 as uuidV4} from "uuid"

@Entity()
export class TokenBlock extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column({nullable: false})
    refresh_token: string;

    @Column({ type: 'uuid', unique: true })
    token_uuid: string;

    @ManyToOne(() => User, {onDelete: "RESTRICT"})
    @JoinColumn({name: "user_id"})
    user_id: number;
}
