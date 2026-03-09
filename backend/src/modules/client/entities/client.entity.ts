import { Entity, Column, OneToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Booking } from '../../booking/entities/booking.entity';
import { LoyaltyCard } from '../../loyalty/entities/loyalty-card.entity';
import { Notification } from '../../notification/entities/notification.entity';

@Entity('clients')
export class Client extends BaseEntity {
  @OneToOne(() => User, (user) => user.client)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Index()
  @Column({ name: 'user_id' })
  userId: string;

  @Index()
  @Column({ unique: true })
  phone: string;

  @Column({ name: 'visit_count', default: 0 })
  visitCount: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @OneToMany(() => Booking, (booking) => booking.client)
  bookings: Booking[];

  @OneToOne(() => LoyaltyCard, (card) => card.client)
  loyaltyCard: LoyaltyCard;

  @OneToMany(() => Notification, (notification) => notification.client)
  notifications: Notification[];
}