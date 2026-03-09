import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Client } from '../../client/entities/client.entity';

export enum NotificationStatus {
  SCHEDULED = 'scheduled',
  SENT = 'sent',
  FAILED = 'failed',
}

@Entity('notifications')
export class Notification extends BaseEntity {
  @ManyToOne(() => Client, (client) => client.notifications)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Index()
  @Column({ name: 'client_id' })
  clientId: string;

  @Column()
  type: string; // SMS, Email, Push

  @Column({ name: 'scheduled_at', type: 'timestamp with time zone' })
  scheduledAt: Date;

  @Column({ name: 'sent_at', type: 'timestamp with time zone', nullable: true })
  sentAt?: Date;

  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.SCHEDULED,
  })
  status: NotificationStatus;
}