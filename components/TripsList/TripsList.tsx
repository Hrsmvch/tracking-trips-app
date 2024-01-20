import React from "react";
import TripItem from "./TripItem";
import styles from "./styles.module.scss";
import { userTrips } from "@/context/TripsContext";

export default function TripsList() {
  const { data: tripsData } = userTrips();
  console.log('tripsData: ', tripsData);

  if (!tripsData?.length)
    return (
      <div className={styles.no_data}>
        You have no trip yet. Please create one first!
      </div>
    );

  return (
    <div className={styles.list}>
      {tripsData?.map((item: any) => (
        <TripItem data={item} />
      ))}
    </div>
  );
}
