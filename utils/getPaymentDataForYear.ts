import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { UserAuth } from '@/context/AuthContext';

const getPaymentDataForYear = (data: any) => {
  const {user} = UserAuth(); 

  return { stat: `New Data value of last ${data}`}
};

export default getPaymentDataForYear;
