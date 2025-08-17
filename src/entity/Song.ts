import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, Column, CreateDateColumn, JoinColumn } from "typeorm";
import { Album } from "./Album";
import { Artist } from "./Artist";
import { Genre } from "./Genre";

@Entity()
export class Song {
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

  @UpdateDateColumn()
  updatedAt: Date;

}