import React, { useState } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import pika from '/assets/pika.png'
import cool from '/assets/cool.png'

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())

export default function SurfData() {
  const [opacity, setOpacity] = useState<any>(1)
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

  function switchOpacity() {
    if (opacity === 1) {
      setOpacity(0)
    } else {
      setOpacity(1)
    }
  }

  return (
    <div className={"pt-8 flex flex-col text-center"}>
      {/* <div className={"text-4xl font-semibold"}>surfbot</div> */}
      <div className={"p-8"}>
      <Image
        src={pika}
        alt="surfing pikachu"
        width={50}
        height={50}
        style={{
          margin: "auto",
        }}
      />
      </div>
      {ssData && <SurfStuff subRegionName={'pops'} data={ssData}/>}
      {nsData && <SurfStuff subRegionName={'puaʻena'} data={nsData}/>}
      {wsData && <SurfStuff subRegionName={'pokaʻi'} data={wsData}/>}
      <div className={"p-8"}>
      <Image
        src={cool}
        alt="box jelly"
        width={50}
        height={50}
        style={{
          margin: "auto",
          opacity: `${opacity}`,
        }}
        onClick={() => switchOpacity()}
      />
      </div>
    </div>
  )
}

function SurfStuff({subRegionName, data}: any) {
  return (
    <div className={"p-4"}>
      <div className={"text-4xl p-2"}>
        {data.data.conditions[0].am.minHeight}
        -
        {data.data.conditions[0].am.maxHeight}
        {` ft`}
      </div>
      <div className={""}>at {subRegionName}</div>
    </div>
  )
}