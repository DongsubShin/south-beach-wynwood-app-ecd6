import { Entity, Column, OneToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Client } from '../../client/entities/client.entity';

@Entity('loyalty_cards')
export class LoyaltyCard extends BaseEntity {
  @OneToOne(() => Client, (client) => client.loyaltyCard)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Index()
  @Column({ name: 'client_id' })
  clientId: string;

  @Column({ default: 0 })
  points: number;

  @Column({ default: 'Bronze' })
  tier: string;

  @Column({ type: 'jsonb', nullable: true })
  rewards: any;
}