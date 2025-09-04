import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "./Abstract";

@Entity()
export class Genre extends TimestampEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;

  @Column('text', {nullable: true})
  description: string;

  @Column({ default: true })
  is_active: boolean;

}