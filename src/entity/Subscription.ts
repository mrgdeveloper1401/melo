import { Entity, PrimaryGeneratedColumn, ManyToOne, Column ,JoinColumn } from "typeorm";
import { User } from "./User";
import { Plan } from "./Plan";
import { TimestampEntity } from "./Abstract";

@Entity()
export class Subscription extends TimestampEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {onDelete: "RESTRICT"})
  @JoinColumn({name: "user_id"})
  user: User;

  @ManyToOne(() => Plan, {onDelete: "RESTRICT"})
  @JoinColumn({name: "plan_id"})
  plan: Plan;

  @Column({ default: true })
  is_active: boolean;

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;

}