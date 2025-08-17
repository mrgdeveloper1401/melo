import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm";
import { Plan } from "./Plan";

@Entity()
export class PlanFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  feature_name: string;

  @ManyToOne(() => Plan)
  @JoinColumn({name: "plan_id"})
  plan: Plan;

  @CreateDateColumn()
  createdAt: Date;
}