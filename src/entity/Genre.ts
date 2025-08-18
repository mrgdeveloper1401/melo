import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "./Abstract";

@Entity()
export class Genre extends TimestampEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ default: true })
  is_active: boolean;

  // @CreateDateColumn()
  // createdAt: Date;
}