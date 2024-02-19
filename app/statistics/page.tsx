'use client'
import MilesPerMonthChart from "@/components/Charts/PaymentPerYearChart"
import Navigation from "@/components/Navigation/Navigation"
import { AuthContextProvider, UserAuth } from "@/context/AuthContext"
import { Trip } from "@/types/trips"
import { db } from "@/utils/firebase"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"

export default function Statistics() { 

  // const allMonths = [
  //   'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  //   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  // ];
  
  // let milesPerMonthData = [];
  
  // allMonths.forEach(month => {
  //   const dataForMonth = milesPerMonthData.find(item => item.month === month);
    
  //   if (dataForMonth) {
  //     milesPerMonthData.push(dataForMonth);
  //   } else {
  //     milesPerMonthData.push({ month: month, sumPerMonth: 0 });
  //   }
  // });

  // const [trips, setTrips] = useState<Trip[]>([]);

// const {user} = UserAuth(); 

// useEffect(() => {
//   if(!user) {
//     setTrips([])
//     return;
//   }
//   const tripsCollection = collection(db, "trips");

//   const currentYear = new Date().getFullYear();
//   const startOfYear = new Date(currentYear, 0, 1);
//   const endOfYear = new Date(currentYear, 11, 31);

//   const q = query(
//     tripsCollection, 
//     where('user', '==', user?.email), 
//     where('dateRange.start', '>=', startOfYear),
//     where('dateRange.end', '<=', endOfYear)
//   );

//   const unsubscribe = onSnapshot(q,
//     (querySnapshot) => {
//       setTrips(
//         querySnapshot.docs.map((doc: any) => ({
//           ...doc.data(),
//           id: doc.id,
//           timestamp: doc.data().timestamp?.toDate().getTime(),
//         })).sort((a: any, b: any) => b.dateRange.end - a.dateRange.end)
//       )
//     },
//     (error) => {
//       console.log("Error fetching trips: ", error);
//       // TODO: handle error.
//     }
//   );
  
//   return unsubscribe;
// }, [user]);

  const milesPerMonthData = [
    { month: 'Jan', sumPerMonth: 400 },
    { month: 'Feb', sumPerMonth: 200 },
    { month: 'Dec', sumPerMonth: 600 }, 
  ];
 
  return (
    <>
      <AuthContextProvider>
        <Navigation /> 
        {/* <MilesPerMonthChart data={milesPerMonthData} /> */}
      </AuthContextProvider>
    </>
  )
}
