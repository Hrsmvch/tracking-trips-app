import React, { useEffect, useState } from 'react'
import TripItem from './TripItem'; 
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { UserAuth } from '@/context/AuthContext';
import styles from './styles.module.scss';

export default function TripsList() { 
  const {user} =  UserAuth();

  const [data, setData] = useState<any>([]);

  useEffect(() => { 
    const tripsCollaction = collection(db, "trips");  
    const getTripsData = async () => {
      try { 
        const q = query(tripsCollaction, where('user', '==', user?.uid));
        const dataCol = await getDocs(q);
        const posts = dataCol.docs.map((docSnapshot) => docSnapshot.data());

        setData(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    getTripsData();

  }, [])

if(!data?.length) return (
  <div className={styles.no_data}>You have no trip yet. Please create one first!</div>
)

  return (
    <div className={styles.list}>
      {data?.map((item: any) => <TripItem data={item} />)}
    </div>
  )
}
