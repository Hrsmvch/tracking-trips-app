'use client'
import React, { useEffect, useState } from "react";
import TripItem from "./TripItem";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Trip } from "@/types/trips";
import styles from './styles.module.scss';
import { UserAuth } from "@/context/AuthContext";

export default function TripsList() {

  const [trips, setTrips] = useState<Trip[]>([]);

  const {user} = UserAuth(); 

  useEffect(() => {
    if(!user) {
      setTrips([])
      return;
    }
    const tripsCollection = collection(db, "trips");
    const q = query(tripsCollection, where('user', '==', user?.email), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q,
      (querySnapshot) => {
        setTrips(
          querySnapshot.docs.map((doc: any) => ({
            ...doc.data(),
            id: doc.id,
            timestamp: doc.data().timestamp?.toDate().getTime(),
          })).sort((a: any, b: any) => b.dateRange.end - a.dateRange.end)
        )
      },
      (error) => {
        console.log("Error fetching trips: ", error);
        // TODO: handle error.
      }
    );
    
    return unsubscribe;
  }, [user]);

  if (!trips.length)
    return (
      <div className={`${styles.trips_list} ${styles.no_data}`}>
        You have no trip yet. <br />
        Please create one first!
      </div>
    );

  return (
    <div className={styles.trips_list}>
      <h2>My trips</h2>
      {trips?.map((item: Trip) => <TripItem key={item.id} data={item} />)}
    </div>
  );
}
