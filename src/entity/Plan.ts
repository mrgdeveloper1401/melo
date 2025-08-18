import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TimestampEntity } from "./Abstract";

@Entity()
export class Plan extends TimestampEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @Column()
  price: number;

  @Column()
  amount: number;

  @Column()
  plan_type: string;

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;

}