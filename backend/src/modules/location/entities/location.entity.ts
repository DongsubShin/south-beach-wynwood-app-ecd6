import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Barber } from '../../barber/entities/barber.entity';
import { Service } from '../../service/entities/service.entity';
import { Booking } from '../../booking/entities/booking.entity';

@Entity('locations')
export class Location extends BaseEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => Barber, (barber) => barber.location)
  barbers: Barber[];

  @OneToMany(() => Service, (service) => service.location)
  services: Service[];

  @OneToMany(() => Booking, (booking) => booking.location)
  bookings: Booking[];
}