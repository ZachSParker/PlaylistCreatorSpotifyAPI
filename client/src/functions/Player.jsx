import {useState,useEffect,React} from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({authToken,trackUri}) {
    const [play,setPlay] = useState(false);
    useEffect(() => setPlay(true),[trackUri])
    if(!authToken) return null
  return (
    <>
      <SpotifyPlayer
      token ={authToken}
      callback={state=>{
        if(!state.isPlaying) setPlay(false)
      }}
      play={play}
      initialVolume={30}
      uris={trackUri ? [trackUri] : []}/>
    </>
  )
}
