import {useEffect,useState,React} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'


const CreatePlaylist = () => {
  const [viteVars,setViteVars] = useState({
    clientId:import.meta.env.VITE_CLIENT_ID,
    clientSecret:import.meta.env.VITE_CLIENT_SECRET
  })
  const spotifyApi = new SpotifyWebApi({
    clientId:viteVars.clientId,
    clientSecret:viteVars.clientSecret
    
  })
  return (
    <div>
      <h2>Create a playlist by searching for songs </h2>
    </div>
  )
}

export default CreatePlaylist