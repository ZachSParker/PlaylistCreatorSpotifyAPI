import {useEffect,useState,React} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import {Container,Form,ButtonGroup,Button} from 'react-bootstrap'
import Player from '../functions/Player';
import axios from 'axios';


const CreatePlaylist = (props) => {
  const {authToken} = props;
  const [searchKey,setSearchKey] = useState("")
  const [searchData,setSearchData]= useState([])
  const [playTrack,setPlayTrack] = useState()
  const [tracks,setTracks] = useState([])
  const [playlist,setPlaylist] = useState({
    name:"",
    genre:"",
    description:"",
    tracks:tracks
  })
  // const [lyrics,setLyrics] = useState("")
  
  const [viteVars,setViteVars] = useState({
    clientId:import.meta.env.VITE_CLIENT_ID,
    clientSecret:import.meta.env.VITE_CLIENT_SECRET
  })
  const spotifyApi = new SpotifyWebApi({
    clientId:viteVars.clientId,
    clientSecret:viteVars.clientSecret
  })
  spotifyApi.setAccessToken(authToken)
  
  // useEffect(()=>{
  //   if(!playTrack) return

  //   axios.get('http://localhost:8000/lyrics',{
  //     params:{
  //       track: playTrack.title,
  //     }
  //   }).then(res=>{
  //     console.log(res)
  //     setLyrics(res.data.lyrics)
  //   }).catch((err)=>{
  //     console.log(err)
  //   })

  // },[playTrack])

  useEffect(()=>{
    if(!authToken) return
    spotifyApi.setAccessToken(authToken)
  },[authToken])

  useEffect(()=>{
    
    if(!searchKey) return setSearchData([])
    if(!authToken) return
    spotifyApi.searchTracks(searchKey).then(res=>{
        res.body.tracks.items.length = 10;
        console.log(res.body.tracks.items)
        setSearchData(res.body.tracks.items)
    })
  },[searchKey,authToken])
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:8000/api/playlists",{
      playlist
    }).then((res)=>{
      console.log(res.data)
    }).catch((err)=>{
      console.log(err);
    })

  }
  const handleChange = (e) => {
    // if (e.target.name == 'title' && e.target.value.length <= 2) {
    //     setFormErrors({ ...formErrors, [e.target.name]: "title needs to be longer than 2 characters" })
    // }
    // else if (e.target.name == 'author' && e.target.value.length <= 4) {
    //     setFormErrors({ ...formErrors, [e.target.name]: "author needs to be longer than 4 characters" })
    // }
    // else {
    //     setFormErrors({ ...formErrors, [e.target.name]: "" })
    // }
    setPlaylist({ ...playlist, [e.target.name]: e.target.value })
}
  


  return (
    <div>
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
          <ButtonGroup>
            <Button variant="primary" size='small' onClick={()=>{setPlayTrack(track)}}>Play</Button>
            <Button variant="primary"size='small'onClick={()=>setTracks([...tracks,{name:track.name,artist:track.artists[0]["name"],image:track.album.images[2]["url"]}])}>+Add to Playlist</Button>
          </ButtonGroup>
          </div>
        ))}
        {/* {searchData.length === 0 && (
          <div className="text-left" style={{whiteSpace:"pre"}}>
            {lyrics}
          </div>
        ) } */}
      </div>
      <div>
        <Player authToken={authToken} trackUri={playTrack?.uri}/>
        </div>
      </Container>
      <div>
            <h2>Create a Playlist</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" value={playlist.title} name="title" onChange={handleChange} />
                    {/* {formErrors.title ? <p>{formErrors.title}</p> : null}
                    {errors.title ? <p>{errors.title.message}</p> : null} */}
                <label htmlFor="genre">Genre</label>
                <input type="text" value={playlist.genre} name="genre" onChange={handleChange} />
                    {/* {formErrors.author ? <p>{formErrors.author}</p> : null}
                    {errors.author ? <p>{errors.author.message}</p> : null} */}
                <label htmlFor="description">Description</label>
                <input type="text" value={playlist.description} name="description" onChange={handleChange} />
                 {tracks.map((track,index)=>(
                    <div key={index}>
                      <p>{track.name}</p>
                      <p>{track.artist}</p>
                      <img src={`${track.image}`} alt="" />
                    </div>
                 ))}

                <button>Add a Playlist</button>
            </form>
        </div>

    </div>
  )
      }

export default CreatePlaylist