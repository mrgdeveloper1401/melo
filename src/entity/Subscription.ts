import { Entity, PrimaryGeneratedColumn, ManyToOne, Column , CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn } from "typeorm";
import { User } from "./User";
import { Plan } from "./Plan";

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({name: "user_id"})
  user: User;

  @ManyToOne(() => Plan)
  @JoinColumn({name: "plan_id"})
  plan: Plan;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}