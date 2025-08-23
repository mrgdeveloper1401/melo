import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { TimestampEntity } from "./Abstract";

@Entity()
export class UserNotification extends TimestampEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (notification) => notification.user_notifications_set, {onDelete: "RESTRICT", nullable: false})
  @JoinColumn({name: "user_id"})
  user: User;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({nullable: true})
  notification_redirect_url: string;

  @Column({nullable: true})
  notification_type: string;

  @Column({default: true})
  is_active: boolean;

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;
}