import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, UpdateDateColumn, CreateDateColumn, JoinColumn } from "typeorm";
import { User } from "./User";
import { Song } from "./Song";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({name: "user_id"})
  user: User;

  @ManyToOne(() => Song)
  @JoinColumn({name: "song_id"})
  song: Song;

  @Column('text')
  body: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}