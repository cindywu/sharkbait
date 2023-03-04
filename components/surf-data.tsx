import React, { useState } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import pika from '/assets/pika.png'
import cool from '/assets/cool.png'

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())

export default function SurfData() {
  const [opacity, setOpacity] = useState<any>(1)

  const {
    data: popsData,
    error: popsError,
    isLoading: popsIsLoading
    } = useSWR('api/pops', fetcher)

  const {
    data: puaenaData,
    error: puaenaError,
    isLoading: puaenaIsLoading
    } = useSWR('api/puaena', fetcher)

  const {
    data: makahaData,
    error: makahaError,
    isLoading: makahaIsLoading
    } = useSWR('api/makaha', fetcher)

  const {
    data: moonPhaseData,
    error: moonPhaseError,
    isLoading: moonPhaseIsLoading,
  } = useSWR('api/moon', fetcher)

  function switchOpacity() {
    if (opacity === 1) {
      setOpacity(0)
    } else {
      setOpacity(1)
    }
  }

  return (
    <div className={"pt-8 flex flex-col text-center"}>
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
      {popsData ? <SurfSpot subRegionName={'at pops'} data={popsData}/> : <SurfSpotLoading data={'at pops'}/>}
      {puaenaData ? <SurfSpot subRegionName={'at puaʻena'} data={puaenaData}/> : <SurfSpotLoading data={'at puaʻena'}/>}
      {makahaData ? <SurfSpot subRegionName={'at makaha'} data={makahaData}/> : <SurfSpotLoading data={'at makaha'}/>}
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
      {moonPhaseData >= .75 && moonPhaseData <= .88 ?
      <div className={'font-mono text-xs pt-2 text-red-500'}>
        warning
        <span>
          {moonPhaseData > .75 && moonPhaseData < .88 ?
          `-high` : `-low`}
        </span>
      </div>
      :
      <div className={'font-mono text-xs pt-2 text-green-500 cursor-pointer'}>safe</div>
      }
      </div>
    </div>
  )
}

function SurfSpotLoading({data}: {data: string}){
  return (
    <div className={"p-4 blur"}>
      <div className={"text-4xl p-2"}>
        1-2 ft
      </div>
      <div>{data}</div>
    </div>
  )
}

function SurfSpot({subRegionName, data}: any) {
  return (
    <div className={"p-4"}>
      <div className={"text-4xl p-2"}>
        {data.data.wave[0].surf.min}
        -
        {data.data.wave[0].surf.max}
        {` ft`}
      </div>
      <div>{subRegionName}</div>
    </div>
  )
}