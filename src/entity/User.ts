import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne
} from "typeorm";
import { Profile } from "./Profile";

@Entity({"name": "users"})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  mobile_phone: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ default: false })
  is_staff: boolean;

  @Column({ default: false })
  is_superuser: boolean;

  @Column({ default: false })
  is_artist: boolean;

  @Column({ default: false })
  is_public: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Profile, profile => profile.user)
  profile: Profile;
}
