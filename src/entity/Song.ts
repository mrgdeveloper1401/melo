import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { Album } from "./Album";
import { Artist } from "./Artist";
import { TimestampEntity } from "./Abstract";
import { Audio } from "./Audio";

@Entity()
export class Song extends TimestampEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Artist, {onDelete: "RESTRICT"})
  @JoinColumn({name: "artist_id"})
  artist: Artist;

  @ManyToOne(() => Album, {onDelete: "RESTRICT"})
  @JoinColumn({name: "album_id"})
  album: Album;

  @Column({ length: 255 })
  title: string;

  @Column()
  release_date: Date;

  @Column({ default: true })
  is_active: boolean;

  @Column()
  play_count: number;

  @ManyToOne(() => Audio)
  @JoinColumn({name: "audio_id"})
  audio: Audio

}