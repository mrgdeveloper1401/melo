import { CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Song } from "./Song";

@Entity()
export class PlayHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {onDelete: "RESTRICT"})
  @JoinColumn({name: "user_id"})
  user: User;

  @ManyToOne(() => Song, {onDelete: "RESTRICT"})
  @JoinColumn({name: "song_id"})
  song: Song;

  @CreateDateColumn()
  played_at: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}