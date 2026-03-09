import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commission } from './entities/commission.entity';
import { Booking } from '../booking/entities/booking.entity';

@Injectable()
export class CommissionService {
  constructor(
    @InjectRepository(Commission) private repo: Repository<Commission>
  ) {}

  async calculateForBooking(booking: Booking, rate: number) {
    const amount = (booking.service.price * rate) / 100;
    
    const commission = this.repo.create({
      barberId: booking.barberId,
      bookingId: booking.id,
      amount,
      rate,
    });

    return this.repo.save(commission);
  }

  async getBarberEarnings(barberId: string) {
    return this.repo.find({
      where: { barberId },
      order: { createdAt: 'DESC' }
    });
  }
}