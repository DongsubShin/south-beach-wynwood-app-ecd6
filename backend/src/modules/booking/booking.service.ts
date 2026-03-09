import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Service } from '../service/entities/service.entity';
import { addMinutes } from 'date-fns';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private repo: Repository<Booking>,
    @InjectRepository(Service) private serviceRepo: Repository<Service>,
  ) {}

  async create(clientId: string, dto: CreateBookingDto) {
    const service = await this.serviceRepo.findOneBy({ id: dto.serviceId });
    if (!service) throw new NotFoundException('Service not found');

    const startTime = new Date(dto.startTime);
    const endTime = addMinutes(startTime, service.duration);

    // Check for overlaps
    const overlap = await this.repo.createQueryBuilder('booking')
      .where('booking.barberId = :barberId', { barberId: dto.barberId })
      .andWhere('booking.status NOT IN (:...statuses)', { statuses: [BookingStatus.CANCELLED] })
      .andWhere('booking.startTime < :endTime AND booking.endTime > :startTime', { startTime, endTime })
      .getOne();

    if (overlap) throw new BadRequestException('Barber is already booked for this time');

    const booking = this.repo.create({
      ...dto,
      clientId,
      endTime,
      status: BookingStatus.PENDING,
    });

    return this.repo.save(booking);
  }

  async findAll(filters: any) {
    return this.repo.find({ where: filters, relations: ['barber', 'service', 'client'] });
  }

  async updateStatus(id: string, status: BookingStatus) {
    const booking = await this.repo.findOneBy({ id });
    if (!booking) throw new NotFoundException();
    booking.status = status;
    return this.repo.save(booking);
  }
}