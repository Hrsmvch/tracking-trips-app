'use client'
import { UserAuth } from '@/context/AuthContext'
import UnAuth from '@/components/UnAuth/UnAuth';
import styles from './page.module.scss'
import TripsList from '@/components/TripsList/TripsList';
import NewTrip from '@/components/NewTripForm/NewTrip';

export default function Home() {
  const {user} =  UserAuth();

  if(!user) return <UnAuth />

  return (
    <main className={styles.main_wrapper}>
      <div className={styles.myTrips}>
        <h2>My trips</h2>
        <TripsList />
      </div>
      <div className={styles.newTrip}>
        <h2>Create new trip</h2>
        <NewTrip />
      </div>
    </main>
  )
}
