import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "./Artist";
import { Album } from "./Album";
import { Genre } from "./Genre";

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Artist)
  @JoinColumn({name: "artist_id"})
  artist: Artist;

  @ManyToOne(() => Album)
  @JoinColumn({name: "album_id"})
  album: Album;

  @Column({ length: 255 })
  title: string;

  @ManyToOne(() => Song)
  song: Song;

  @Column()
  release_date: Date;

  @Column({ default: true })
  is_active: boolean;

  @Column()
  play_count: number;

  @ManyToOne(() => Genre)
  @JoinColumn({name: "genre_id"})
  genre: Genre;

  @CreateDateColumn()
  createdAt: Date;
}