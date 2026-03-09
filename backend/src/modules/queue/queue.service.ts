import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueueEntry, QueueStatus } from './entities/queue-entry.entity';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(QueueEntry) private repo: Repository<QueueEntry>
  ) {}

  async joinQueue(clientId: string, locationId: string, barberId?: string) {
    const lastEntry = await this.repo.findOne({
      where: { locationId, status: QueueStatus.WAITING },
      order: { position: 'DESC' }
    });

    const position = lastEntry ? lastEntry.position + 1 : 1;
    const estimatedWait = position * 20; // 20 mins per person avg

    const entry = this.repo.create({
      clientId,
      locationId,
      barberId,
      position,
      estimatedWait,
      status: QueueStatus.WAITING
    });

    return this.repo.save(entry);
  }

  async getQueueStatus(locationId: string) {
    return this.repo.find({
      where: { locationId, status: QueueStatus.WAITING },
      order: { position: 'ASC' },
      relations: ['client', 'barber']
    });
  }
}