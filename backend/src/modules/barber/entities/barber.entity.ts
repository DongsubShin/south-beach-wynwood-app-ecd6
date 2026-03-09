import { Entity, Column, ManyToOne, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { Location } from '../../location/entities/location.entity';
import { Service } from '../../service/entities/service.entity';
import { Booking } from '../../booking/entities/booking.entity';
import { Commission } from '../../commission/entities/commission.entity';

@Entity('barbers')
export class Barber extends BaseEntity {
  @OneToOne(() => User, (user) => user.barber)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Index()
  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => Location, (location) => location.barbers)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Index()
  @Column({ name: 'location_id' })
  locationId: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', name: 'working_hours', nullable: true })
  workingHours: any;

  @ManyToMany(() => Service)
  @JoinTable({
    name: 'barber_specialties',
    joinColumn: { name: 'barber_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'service_id', referencedColumnName: 'id' },
  })
  specialties: Service[];

  @OneToMany(() => Booking, (booking) => booking.barber)
  bookings: Booking[];

  @OneToMany(() => Commission, (commission) => commission.barber)
  commissions: Commission[];
}