import {useEffect,useState,React} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import {Container,Form} from 'react-bootstrap'


const CreatePlaylist = (props) => {
  const {authToken} = props;
  const [searchKey,setSearchKey] = useState("")
  const [searchData,setSearchData]= useState([])
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
    if(!authToken) return
    spotifyApi.setAccessToken(authToken)
  },[authToken])

  useEffect(()=>{
    
    if(!searchKey) return setSearchData([])
    if(!authToken) return
    spotifyApi.searchTracks(searchKey).then(res=>{
      console.log(res.body.tracks.items)
        setSearchData(res.body.tracks.items)
    })
  },[searchKey,authToken])
  return (
    <Container className="d-flex flex-column py-2 bg-gradient-primary-success" style={{height:"80vh"}}>
        <Form.Control className="border-primary"
        type="search"
        placeholder="Search Songs/Artists"
        value={searchKey}
        name="searchData"
        onChange={e=> setSearchKey(e.target.value)}
      />
      <div className="flex-grow-1 my-2 text-success" style={{overflowY:"auto"}}>
        Songs
        {searchData.map((track,index)=>(
          <div key={index}>
          <p className="border-primary">{track.name}</p>
          <p>Song Artist: {track.artists[0]["name"]}</p>
          <img src={`${track.album.images[2]["url"]}`}/>
          <p></p>
          </div>
        ))
      
        }
      </div>
      <div>Bottom of Page</div>
      </Container>
  )
}

export default CreatePlaylist