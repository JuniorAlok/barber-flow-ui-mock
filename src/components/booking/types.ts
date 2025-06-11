
export interface BookingForm {
  serviceId: string;
  barberId: string;
  date: Date | undefined;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
}
