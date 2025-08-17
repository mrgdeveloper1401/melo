import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Wallet } from "./Wallet";

@Entity()
export class CartNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Wallet)
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