import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Location } from '../../location/entities/location.entity';

@Entity('services')
export class Service extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'int', comment: 'Duration in minutes' })
  duration: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  category: string;

  @ManyToOne(() => Location, (location) => location.services)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Index()
  @Column({ name: 'location_id' })
  locationId: string;
}