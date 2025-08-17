import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Wallet } from "./Wallet";

@Entity()
export class CartNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Wallet)
  @JoinColumn({name: "wallet_id"})
  wallet: Wallet;

  @Column({ length: 20 })
  cart: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

//   @DeleteDateColumn()
//   deletedAt: Date;
}