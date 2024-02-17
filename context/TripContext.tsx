'use client'
import { Trip } from '@/types/trips';
import { createContext, useContext, useState, useEffect } from 'react';


const TripsContext = createContext<any>(null);

export const TripsContextProvider = ({ children }: any) => {
  const initTrip = {
    company: '',
    miles: 0,
    note: '', 
  }

  const [trip, setTrip] = useState<Trip>(initTrip); 

  const resetTrip = () => {
    setTrip(initTrip);
  }

  return (
    <TripsContext.Provider value={{ trip, setTrip, resetTrip }}>
      {children}
    </TripsContext.Provider>
  );
};

export const userTripContext = () => {
  return useContext(TripsContext);
};
