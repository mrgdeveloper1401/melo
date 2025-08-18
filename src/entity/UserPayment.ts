import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { Subscription } from "./Subscription";
import { User } from "./User";
import { Gateway } from "./Gateway";
import { TimestampEntity } from "./Abstract";

@Entity()
export class UserPayment extends TimestampEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {onDelete: "RESTRICT"})
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

  @ManyToOne(() => Subscription, {onDelete: "RESTRICT"})
  @JoinColumn({name: "subscription_id"})
  subscription: Subscription;

  @Column('jsonb')
  response_gateway: any;

  // @CreateDateColumn()
  // createdAt: Date;
}