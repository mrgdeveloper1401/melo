import { Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "./Playlist";
import { Song } from "./Song";

@Entity()
export class PlaylistSong {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Playlist, {onDelete: "RESTRICT"})
  @JoinColumn({name: "playlist_id"})
  playlist: Playlist;

  @ManyToOne(() => Song, {onDelete: "RESTRICT"})
  @JoinColumn({name: "song_id"})
  song: Song;

  @Column({default: 0})
  position: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}