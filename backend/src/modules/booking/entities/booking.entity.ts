import { Entity, Column, ManyToOne, JoinColumn, OneToOne, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Barber } from '../../barber/entities/barber.entity';
import { Client } from '../../client/entities/client.entity';
import { Service } from '../../service/entities/service.entity';
import { Location } from '../../location/entities/location.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { Commission } from '../../commission/entities/commission.entity';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NOSHOW = 'no_show',
}

@Entity('bookings')
export class Booking extends BaseEntity {
  @ManyToOne(() => Barber, (barber) => barber.bookings)
  @JoinColumn({ name: 'barber_id' })
  barber: Barber;

  @Index()
  @Column({ name: 'barber_id' })
  barberId: string;

  @ManyToOne(() => Client, (client) => client.bookings)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Index()
  @Column({ name: 'client_id' })
  clientId: string;

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Index()
  @Column({ name: 'service_id' })
  serviceId: string;

  @ManyToOne(() => Location, (location) => location.bookings)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Index()
  @Column({ name: 'location_id' })
  locationId: string;

  @Index()
  @Column({ name: 'start_time', type: 'timestamp with time zone' })
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamp with time zone' })
  endTime: Date;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @OneToOne(() => Payment, (payment) => payment.booking)
  payment: Payment;

  @OneToOne(() => Commission, (commission) => commission.booking)
  commission: Commission;
}