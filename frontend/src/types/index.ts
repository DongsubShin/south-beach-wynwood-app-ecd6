export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'barber' | 'client';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
}

export interface Appointment {
  id: string;
  clientId: string;
  barberId: string;
  serviceId: string;
  startTime: string;
  status: 'scheduled' | 'checked-in' | 'completed' | 'cancelled';
}

export interface QueueItem {
  id: string;
  clientName: string;
  serviceName: string;
  estimatedWaitMinutes: number;
  status: 'waiting' | 'in-chair' | 'completed';
}