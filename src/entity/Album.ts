import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Image } from "./Image";
import { User } from "./User";

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  bio: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Image)
  @JoinColumn({name: "cover_image_id"})
  cover_image: Image;

  @Column()
  release_date: Date;

  @ManyToOne(() => User)
  @JoinColumn({name: "user_id"})
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

//   @DeleteDateColumn()
//   deletedAt: Date;
}