import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from '../booking/entities/booking.entity';
import { Payment, PaymentStatus } from '../payment/entities/payment.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
  ) {}

  async getDashboardStats(locationId: string) {
    const revenue = await this.paymentRepo.createQueryBuilder('payment')
      .innerJoin('payment.booking', 'booking')
      .where('booking.locationId = :locationId', { locationId })
      .andWhere('payment.status = :status', { status: PaymentStatus.SUCCEEDED })
      .select('SUM(payment.amount)', 'total')
      .getRawOne();

    const bookingsCount = await this.bookingRepo.count({
      where: { locationId, status: BookingStatus.COMPLETED }
    });

    return {
      totalRevenue: parseFloat(revenue?.total || 0),
      completedBookings: bookingsCount,
      averageTicketSize: bookingsCount > 0 ? parseFloat(revenue?.total || 0) / bookingsCount : 0
    };
  }
}