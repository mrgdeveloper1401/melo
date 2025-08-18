import { CreateDateColumn, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {onDelete: "RESTRICT"})
  @JoinColumn({name: "from_user_id"})
  from_user: User;

  @ManyToOne(() => User, {onDelete: "RESTRICT"})
  @JoinColumn({name: "to_user_id"})
  to_user: User;

  @CreateDateColumn()
  createdAt: Date;
}