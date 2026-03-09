import { IsUUID, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty()
  @IsUUID()
  barberId: string;

  @ApiProperty()
  @IsUUID()
  serviceId: string;

  @ApiProperty()
  @IsUUID()
  locationId: string;

  @ApiProperty()
  @IsDateString()
  startTime: string;
}