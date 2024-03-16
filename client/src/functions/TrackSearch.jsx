import React from 'react'

export default function TrackSearch(track,chooseTrack) {
  function handlePlay(){
    chooseTrack(track)
  }
  return (
    <button className='btn-btn-primary-xsm' onClick={handlePlay}>Play</button>
  )
}
