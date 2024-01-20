'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { collection, query, where, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';  
import { UserAuth } from './AuthContext';

const TripsContext = createContext<any>(null);

export const TripsContextProvider = ({ children }: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} =  UserAuth(); 

  const tripsCollection = collection(db, 'trips');

  const getTripsData = async () => {
    try {
      const q = query(tripsCollection, where('user', '==', user?.uid));
      const dataCol = await getDocs(q);
      const tripsData: any = dataCol.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      }));
      setData(tripsData);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  useEffect(() => {
    if (user) {
      getTripsData();
    }
  }, [user]);

  useEffect(() => {
    const checkTripsData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };

    checkTripsData();
  }, [data]);

  return (
    <TripsContext.Provider value={{ data, loading, getTripsData }}>
      {children}
    </TripsContext.Provider>
  );
};

export const userTrips = () => {
  return useContext(TripsContext);
};
