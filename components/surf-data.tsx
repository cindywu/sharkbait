import React, { useState } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import pika from '/assets/pika.png'
import cool from '/assets/cool.png'
// import { AuthProvider } from 'react-auth-kit'
import { useSignIn } from 'react-auth-kit'
import axios from 'axios'

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json())

export default function SurfData() {
  const [opacity, setOpacity] = useState<any>(1)
  const signIn = useSignIn()
  const [formData, setFormData] = React.useState({email: '', password: ''})


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

  const onSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/login', formData)
        .then((res)=>{
            if(res.status === 200){
                console.log({res})
                if(signIn(
                    {
                        token: res.data.token,
                        expiresIn:res.data.expiresIn,
                        tokenType: "Bearer",
                        authState: res.data.authUserState,
                        refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
                        refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
                    }
                )){ // Only if you are using refreshToken feature
                    // Redirect or do-something
                }else {
                    //Throw error
                }
            }
        })
}

  return (
    <div className={"pt-8 flex flex-col text-center"}>
      {/* <div className={"text-4xl font-semibold"}>surfbot</div> */}
      <div>
      <form onSubmit={onSubmit}>
            <input className={'m-4 border-2 border-blue-900'} type={"email"} onChange={(e)=>setFormData({...formData, email: e.target.value})}/>
            <input className={'m-4 bg-blue-100'} type={"password"} onChange={(e)=>setFormData({...formData, password: e.target.value})}/>

            <button>Submit</button>
        </form>
      </div>

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
      {/* {ssData && <SurfStuff subRegionName={'pops'} data={ssData}/>}
      {nsData && <SurfStuff subRegionName={'puaʻena'} data={nsData}/>}
      {wsData && <SurfStuff subRegionName={'pokaʻi'} data={wsData}/>} */}
      {popsData && <SurfStuff2 subRegionName={'at pops'} data={popsData}/>}
      {puaenaData && <SurfStuff2 subRegionName={'at puaena'} data={puaenaData}/>}
      {makahaData && <SurfStuff2 subRegionName={'at makaha'} data={makahaData}/>}
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

function SurfStuff2({subRegionName, data}: any) {
  console.log(data.data.wave[0].surf.min)
  return (
    <div className={"p-4"}>
      <div className={"text-4xl p-2"}>
        {data.data.wave[0].surf.min}
        -
        {data.data.wave[0].surf.max}
        {` ft`}
      </div>
      <div className={""}>at {subRegionName}</div>
    </div>
  )
}