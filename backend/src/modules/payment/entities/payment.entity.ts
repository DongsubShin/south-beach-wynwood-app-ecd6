import { Entity, Column, OneToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Booking } from '../../booking/entities/booking.entity';

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

@Entity('payments')
export class Payment extends BaseEntity {
  @OneToOne(() => Booking, (booking) => booking.payment)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @Index()
  @Column({ name: 'booking_id' })
  bookingId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Index()
  @Column({ name: 'stripe_id', nullable: true })
  stripeId?: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;
}