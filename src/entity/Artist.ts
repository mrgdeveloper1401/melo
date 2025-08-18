import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Image } from "./Image";

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @ManyToOne(() => User, {onDelete: "RESTRICT"})
  @JoinColumn({name: "user_id"})
  user: User;

  @Column({ default: true })
  is_active: boolean;

  @Column()
  monthly_listeners: number;

  @ManyToOne(() => Image, {onDelete: "RESTRICT"})
  @JoinColumn({name: "image_id"})
  cover_image: Image;

  @Column({ length: 400 })
  bio: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

//   @DeleteDateColumn()
//   deletedAt: Date;
}