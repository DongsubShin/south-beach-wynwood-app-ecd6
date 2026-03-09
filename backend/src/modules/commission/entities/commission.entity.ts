import { Entity, Column, ManyToOne, OneToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Barber } from '../../barber/entities/barber.entity';
import { Booking } from '../../booking/entities/booking.entity';

@Entity('commissions')
export class Commission extends BaseEntity {
  @ManyToOne(() => Barber, (barber) => barber.commissions)
  @JoinColumn({ name: 'barber_id' })
  barber: Barber;

  @Index()
  @Column({ name: 'barber_id' })
  barberId: string;

  @OneToOne(() => Booking, (booking) => booking.commission)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @Index()
  @Column({ name: 'booking_id' })
  bookingId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, comment: 'Percentage rate' })
  rate: number;

  @Column({ name: 'paid_at', type: 'timestamp with time zone', nullable: true })
  paidAt?: Date;
}