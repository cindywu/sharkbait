import React from 'react'
import useSWR from 'swr'

export default function SurfData() {
  const ssFetcher = () => fetch('/api/south-shore').then((res) => res.json())
  const nsFetcher = () => fetch('/api/north-shore').then((res) => res.json())
  const wsFetcher = () => fetch('/api/west-side').then((res) => res.json())

  const {
    data: ssData,
    error: ssError,
    isLoading: ssIsLoading,
  } = useSWR('/api/south-shore', ssFetcher)

  const {
    data: nsData,
    error: nsError,
    isLoading: nsIsLoading,
   } = useSWR('/api/north-shore', nsFetcher)

   const {
    data: wsData,
    error: wsError,
    isLoading: wsIsLoading
   } = useSWR('api/west-side', wsFetcher)


  return (
    <>
      surfbot
      {ssData && <SurfStuff subRegionName={'south shore'} data={ssData}/>}
      {nsData && <SurfStuff subRegionName={'north shore'} data={nsData}/>}
      {wsData && <SurfStuff subRegionName={'west side'} data={wsData}/>}
    </>
  )
}


function SurfStuff({subRegionName, data}: any) {
  return (
    <div>
      <div>
        {subRegionName}
        <div>
          {data.data.conditions[0].am.minHeight}
          -
          {data.data.conditions[0].am.maxHeight}
        </div>
      </div>
    </div>
  )
}
