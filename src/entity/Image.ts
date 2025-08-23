import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TimestampEntity } from "./Abstract";
import { Profile } from "./Profile";

@Entity()
export class Image extends TimestampEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  file_name: string;

  @Column({length: 500})
  image_path: string;

  @Column({ length: 50 })
  format: string;

  @Column({ length: 50 })
  type: string;

  @Column({default: 0})
  width: number;

  @Column({default: 0})
  height: number;

  @Column({default: 0})
  size: number;

  @OneToMany(
    () => Profile,
    (profile) => profile.profile_image
  )
  profile_image_set: Profile[];

  @OneToMany(
    () => Profile,
    (profile) => profile.banner_image
  )
  profile_banner_image_set: Profile[];

  @OneToMany(
    () => Profile,
    (profile) => profile.banner_galery_image
  )
  profile_banner_galery_image_set: Profile[];
}