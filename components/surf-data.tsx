import React from 'react'
import useSWR from 'swr'

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())

export default function SurfData() {

  const {
    data: ssData,
    error: ssError,
    isLoading: ssIsLoading,
  } = useSWR('/api/south-shore', fetcher)

  const {
    data: nsData,
    error: nsError,
    isLoading: nsIsLoading,
   } = useSWR('/api/north-shore', fetcher)

   const {
    data: wsData,
    error: wsError,
    isLoading: wsIsLoading
   } = useSWR('api/west-side', fetcher)

  if (ssError || nsError || wsError) return <div>An error has occurred.</div>
  if (ssIsLoading || nsIsLoading || wsIsLoading) return <div>Loading...</div>

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
