"use client";
import { UserAuth } from "@/context/AuthContext";
import { Trip } from "@/types/trips";
import { db } from "@/utils/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import useTripData from "./hooks/useYearlyTripData";
import MilesPerYearChart from "@/components/Charts/chartMilesPerYear";
import PaymentPerYearChart from "@/components/Charts/chartPaymentPerYear";
import TripsByStatusPerYearChart from "@/components/Charts/chartByStatusPerYear";
import DaysInTripPerYearChart from "@/components/Charts/chartDaysInTripPerYear";
import styles from './styles.module.scss';

export default function Statistics() {
  const { user } = UserAuth();

  const [tripsByYear, setTripsByYear] = useState<Trip[]>([]);

  useEffect(() => {
    if (!user) {
      setTripsByYear([]);
      return;
    }

    const tripsCollection = collection(db, "trips");

    const currentYear = new Date().getFullYear();

    const startDateOfYear = new Date(currentYear, 0, 1);
    const endDateOfYear = new Date(currentYear, 11, 31, 23, 59, 59);

    const q = query(tripsCollection, where("user", "==", user?.email));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        setTripsByYear(
          querySnapshot.docs
            .map((doc: any) => ({
              ...doc.data(),
              id: doc.id,
              timestamp: doc.data().timestamp?.toDate().getTime(),
            }))
            .filter((trip: any) => {
              const startDate = trip.dateRange.start.toDate();
              const endDate = trip.dateRange.end.toDate();

              return startDate >= startDateOfYear && endDate <= endDateOfYear;
            })
        );
      },
      (error) => {
        console.log("Error fetching trips: ", error);
        // TODO: handle error.
      }
    );

    return unsubscribe;
  }, [user]);

  const { miles, payment, statuses, totalDaysInTrip } =
    useTripData(tripsByYear);

  console.log({ miles, payment, statuses, totalDaysInTrip });

  return (
    <>
      <div className={styles.column}>
        <MilesPerYearChart data={miles} />
        <PaymentPerYearChart data={payment} />
      </div>
      <div className={styles.column}>
        <TripsByStatusPerYearChart
          data={statuses}
          totalTrips={tripsByYear.length}
        />
        <DaysInTripPerYearChart data={totalDaysInTrip} />
      </div>
    </>
  );
}
