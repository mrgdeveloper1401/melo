import { Column ,Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "./Abstract";

@Entity()
export class Audio extends TimestampEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  audio_file: string;

  @Column()
  size: number;

  @Column()
  hash: string;

  @Column()
  duration: number;

  @Column({ length: 10 })
  audio_format: string;

  @Column({ default: true })
  is_active: boolean;

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;

}