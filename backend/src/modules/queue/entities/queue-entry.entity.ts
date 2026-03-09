import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Barber } from '../../barber/entities/barber.entity';
import { Client } from '../../client/entities/client.entity';
import { Location } from '../../location/entities/location.entity';

export enum QueueStatus {
  WAITING = 'waiting',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('queue_entries')
export class QueueEntry extends BaseEntity {
  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Index()
  @Column({ name: 'client_id' })
  clientId: string;

  @ManyToOne(() => Barber, { nullable: true })
  @JoinColumn({ name: 'barber_id' })
  barber?: Barber;

  @Index()
  @Column({ name: 'barber_id', nullable: true })
  barberId?: string;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Index()
  @Column({ name: 'location_id' })
  locationId: string;

  @Column({ type: 'int' })
  position: number;

  @Column({
    type: 'enum',
    enum: QueueStatus,
    default: QueueStatus.WAITING,
  })
  status: QueueStatus;

  @Column({ name: 'estimated_wait_minutes', type: 'int' })
  estimatedWait: number;
}