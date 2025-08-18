import { Entity, JoinColumn, OneToOne, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, {onDelete: "RESTRICT"})
  @JoinColumn({name: "user_id"})
  user: User;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

//   @DeleteDateColumn()
//   deletedAt: Date;
}