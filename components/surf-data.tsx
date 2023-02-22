import React, {
  useEffect
 } from 'react'
import useSWR from 'swr'
import type { NextApiRequest, NextApiResponse } from 'next';

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())

export default function SurfData() {
  // put fetch call on front end

  const [surflineData, setSurflineData] = React.useState<any>(null)

  useEffect(() => {
    const response = fetch('https://services.surfline.com/kbyg/regions/forecasts/conditions?subregionId=58581a836630e24c44878fcb&days=2')
    .then((res) => res.json())
    .then((data) => {
      setSurflineData(data)
    })
  },[])

  console.log({surflineData})

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

  return (
    <>
      surfbot
      {ssData && <SurfStuff subRegionName={'south shore'} data={ssData}/>}
      {/* {nsData && <SurfStuff subRegionName={'north shore'} data={nsData}/>} */}
      {surflineData && <SurfStuff subRegionName={'new'} data={surflineData}/>}
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

// export async function getServerSideProps({_req, res} : {_req: NextApiRequest, res: NextApiResponse}) {

//   const response = await fetch('https://services.surfline.com/kbyg/regions/forecasts/conditions?subregionId=58581a836630e24c44878fcb&days=2');

//   const json = await response.json();
//   // res.status(200).json(json);

//   return { props: {json}}
// }