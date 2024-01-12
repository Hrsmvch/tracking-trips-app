'use client'
import UnAuth from '@/components/UnAuth/UnAuth';
import { UserAuth } from '@/context/AuthContext';
import styles from './styles.module.scss'

export default function Statistics() {
  const {user} =  UserAuth();

  if(!user) return <UnAuth />

  return (
    <main>
      <h2>Statistics</h2>
    </main>
  )
}
