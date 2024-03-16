import {useEffect,useState,React} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import {Container,Form} from 'react-bootstrap'
import Player from '../functions/Player';
import axios from 'axios';

const CreatePlaylist = (props) => {
  const {authToken} = props;
  const [searchKey,setSearchKey] = useState("")
  const [searchData,setSearchData]= useState([])
  const [playTrack,setPlayTrack] = useState()
  const [lyrics,setLyrics] = useState("")
  const [viteVars,setViteVars] = useState({
    clientId:import.meta.env.VITE_CLIENT_ID,
    clientSecret:import.meta.env.VITE_CLIENT_SECRET
  })
  const spotifyApi = new SpotifyWebApi({
    clientId:viteVars.clientId,
    clientSecret:viteVars.clientSecret
  })
  spotifyApi.setAccessToken(authToken)
  
  useEffect(()=>{
    if(!playTrack) return

    axios.get('http://localhost:8000/lyrics',{
      params:{
        track: playTrack.title,
        artist:playTrack.artist
      }
    }).then(res=>{
      setLyrics(res.data.lyrics)
    })

  },[playTrack])

  useEffect(()=>{
    if(!authToken) return
    spotifyApi.setAccessToken(authToken)
  },[authToken])

  useEffect(()=>{
    
    if(!searchKey) return setSearchData([])
    if(!authToken) return
    spotifyApi.searchTracks(searchKey).then(res=>{
      // console.log(res.body.tracks.items)
        setSearchData(res.body.tracks.items)
    })
  },[searchKey,authToken])
  
  return (
    <Container className="d-flex flex-column py-2" style={{height:"80vh"}}>
        <Form.Control className="border-primary"
        type="search"
        placeholder="Search Songs/Artists"
        value={searchKey}
        name="searchData"
        onChange={e=> setSearchKey(e.target.value)}
      />
      <div className="flex-grow-1 my-2 text-primary" style={{overflowY:"auto"}}>
        Songs
        {searchData.map((track,index)=>(
          <div key={index} className='d-flex flex-column m-2 align-items-center border-primary'>
          <p className="border-primary">{track.name}</p>
          <p>Song Artist: {track.artists[0]["name"]}</p>
          <img src={`${track.album.images[2]["url"]}`}/>
          <button className='btn-btn-primary-xsm' onClick={()=>{setPlayTrack(track);setSearchKey("");setLyrics("")}}>Play</button>
          </div>
        ))}
        {searchData.length === 0 && (
          <div className="text-left" style={{whiteSpace:"pre"}}>
            {lyrics}
          </div>
        ) }
      </div>
      <div>
        <Player authToken={authToken} trackUri={playTrack?.uri}/>
        </div>
      </Container>
  )
}

export default CreatePlaylist