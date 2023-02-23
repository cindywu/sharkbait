import React from 'react'
import Thing from './thing'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>party 🥳
      <Thing/>
    </div>
  )
}
