import { BaseEntity, Column } from 'typeorm';

export abstract class TimestampEntity extends BaseEntity {
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: "created_at"
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: "updated_at"
  })
  updatedAt: Date;
}
