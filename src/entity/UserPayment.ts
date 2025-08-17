import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, JoinColumn } from "typeorm";
import { Subscription } from "./Subscription";
import { User } from "./User";
import { Gateway } from "./Gateway";

@Entity()
export class UserPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({name: "user_id"})
  user: User;

  @ManyToOne(() => Gateway)
  @JoinColumn(
    {
      name: "gateway_id"
    }
  )
  gateway: Gateway;

  @Column()
  price: number;

  @ManyToOne(() => Subscription)
  @JoinColumn({name: "subscription_id"})
  subscription: Subscription;

  @Column('jsonb')
  response_gateway: any;

  @CreateDateColumn()
  createdAt: Date;
}