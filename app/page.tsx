'use client'
import { UserAuth } from '@/context/AuthContext'
import UnAuth from '@/components/UnAuth/UnAuth';
import styles from './page.module.scss'

export default function Home() {
  const {user} =  UserAuth();

  if(!user) return <UnAuth />

  return (
    <main className={styles.main_wrapper}>
      <div className={styles.myTrips}>My trips</div>
      <div className={styles.newTrip}>Create new trip</div>
    </main>
  )
}
