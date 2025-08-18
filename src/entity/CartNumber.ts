import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "./Wallet";
import { TimestampEntity } from "./Abstract";

@Entity()
export class CartNumber extends TimestampEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Wallet, {onDelete: "RESTRICT"})
  @JoinColumn({name: "wallet_id"})
  wallet: Wallet;

  @Column({ length: 20 })
  cart: string;

  @Column({ default: true })
  is_active: boolean;

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;

//   @DeleteDateColumn()
//   deletedAt: Date;
}