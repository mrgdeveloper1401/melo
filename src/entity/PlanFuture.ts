import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Plan } from "./Plan";
import { TimestampEntity } from "./Abstract";

@Entity()
export class PlanFeature extends TimestampEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  feature_name: string;

  @ManyToOne(() => Plan, {onDelete: "RESTRICT"})
  @JoinColumn({name: "plan_id"})
  plan: Plan;

  // @CreateDateColumn()
  // createdAt: Date;
}