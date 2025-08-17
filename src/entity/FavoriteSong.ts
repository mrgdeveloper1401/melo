import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Song } from "./Song";

@Entity()
export class FavoriteSong {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({name: "user_id"})
  user: User;

  @ManyToOne(() => Song)
  @JoinColumn({name: "song_id"})
  song: Song;

  @CreateDateColumn()
  added_at: Date;

  @CreateDateColumn()
  createdAt: Date;
}