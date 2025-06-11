
import { useMemo } from 'react';
import { Service, Barber } from '@/data/types';

export const useActiveServices = (services: Service[]) => {
  return useMemo(() => services.filter(service => service.isActive), [services]);
};

export const useActiveBarbers = (barbers: Barber[]) => {
  return useMemo(() => barbers.filter(barber => barber.isActive), [barbers]);
};
