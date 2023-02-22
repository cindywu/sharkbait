// "use client"
import React from 'react'
import SurfData from '../components/surf-data'

async function getData() {
  const res = await fetch('https://services.surfline.com/kbyg/regions/forecasts/conditions?subregionId=58581a836630e24c44878fcb&days=2')

  if (!res.ok){
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home() {
  const data = await getData()
  console.log({data})
  return <SurfData data={data}/>
}

