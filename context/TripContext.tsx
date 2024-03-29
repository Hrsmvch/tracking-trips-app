"use client";
import { Trip } from "@/types/trips";
import { createContext, useContext, useState, useEffect } from "react";

const TripsContext = createContext<any>(null);

export const TripsContextProvider = ({ children }: any) => {
  const initTrip = {
    company: "",
    origin: {},
    destination: {},
    dateRange: {},
    miles: 0,
    payment: 0,
    paid: false,
    status: "not-started",
    note: "",
  };

  const [trip, setTrip] = useState<Trip>(initTrip);
  const [mobileForm, setMobileForm] = useState(true);


  const resetTrip = () => {
    setTrip(initTrip);
  };

  return (
    <TripsContext.Provider value={{ trip, setTrip, resetTrip, mobileForm, setMobileForm }}>
      {children}
    </TripsContext.Provider>
  );
};

export const userTripContext = () => {
  return useContext(TripsContext);
};
