import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Image } from "./Image";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100 })
  last_name: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column('simple-array', { nullable: true })
  jobs: string[];

  @Column('simple-array', { nullable: true })
  social: string[];

  @OneToOne(() => User, user => user.profile, {onDelete: "RESTRICT"})
  @JoinColumn()
  user: User;

  @ManyToOne(() => Image, { nullable: true , onDelete: "RESTRICT"})
  @JoinColumn({ name: 'profile_image_id' })
  profile_image: Image;

  @ManyToOne(() => Image, { nullable: true , onDelete: "RESTRICT"})
  @JoinColumn({ name: 'banner_image_id' })
  banner_image: Image;

  @ManyToOne(() => Image, { nullable: true ,onDelete: "RESTRICT"})
  @JoinColumn({ name: 'banner_galery_image_id' })
  banner_galery_image: Image;
}