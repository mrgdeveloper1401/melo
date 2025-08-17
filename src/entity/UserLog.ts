import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class UserLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({name: "user_id"})
  user: User;

  @Column()
  ip_address: string;

  @Column()
  user_agent: string;

  @Column()
  request_path: string;

  @CreateDateColumn()
  createdAt: Date;
}