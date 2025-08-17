import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Gateway {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    unique: true
  })
  gateway_name: string;

  @Column({
    default: true
  })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}