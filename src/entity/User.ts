import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  OneToOne,
  Index,
  OneToMany
} from "typeorm";
import { Profile } from "./Profile";
import { TimestampEntity } from "./Abstract";
import { UserNotification } from "./UserNotification";

@Entity({name: "users"})
export class User extends TimestampEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 15, nullable: true})
  mobile_phone: string;

  @Column({ unique: true, length: 64 })
  email: string;

  @Column({ unique: true, length:  64})
  username: string;

  @Column({length: 64})
  password: string;

  @Column({ default: true})
  is_active: boolean;

  @Column({ default: false })
  is_staff: boolean;

  @Column({ default: false })
  is_superuser: boolean;

  @Column({ default: false })
  is_artist: boolean;

  @Column({ default: true })
  is_public: boolean;

  @OneToOne(() => Profile, profile => profile.user)
  profile: Profile;

  @OneToMany(
    () => UserNotification,
    (notification) => notification.user
  )
  user_notifications_set: UserNotification[];
}
