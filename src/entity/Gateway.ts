import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TimestampEntity } from "./Abstract";

@Entity()
export class Gateway extends TimestampEntity{
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

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;
}