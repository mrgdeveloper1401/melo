import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TimestampEntity } from "./Abstract";

@Entity()
export class Image extends TimestampEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  file_name: string;

  @Column({ length: 50 })
  format: string;

  @Column({ length: 50 })
  type: string;

  @Column({default: 0})
  width: number;

  @Column({default: 0})
  height: number;

  @Column({default: 0})
  size: number;

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;
}