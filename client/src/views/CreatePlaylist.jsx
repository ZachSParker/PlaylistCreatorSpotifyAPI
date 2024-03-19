import {useEffect,useState,React} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import {Container,Form,ButtonGroup,Button} from 'react-bootstrap'
import Player from '../functions/Player';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
    tracks:[]
  })
  const navigate = useNavigate()
  const [errors,setErrors] = useState({})
  const [formErrors, setFormErrors] = useState({})
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
        res.body.tracks.items.length = 5;
        console.log(res.body.tracks.items)
        setSearchData(res.body.tracks.items)
    })
  },[searchKey,authToken])
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    // i know i could use a service method here but it took too long to get working so im not going to touch it lmao
    axios.post("http://localhost:8000/api/playlists",{
      ...playlist,tracks
    }).then((res)=>{
      console.log(res.data)
      navigate("/")
    }).catch((err)=>{
      console.log(err);
      setErrors(err.response.data.errors)
    })

  }
  const handleChange = (e) => {
    if (e.target.name == 'title' && e.target.value.length <= 1) {
        setFormErrors({ ...formErrors, [e.target.name]: "Playlist name is required" })
        
    }
    else if (e.target.name == 'genre' && e.target.length <= 255) {
        setFormErrors({ ...formErrors, [e.target.name]: "playlist genre needs to be less than 255 chars" })
    }
    else if (e.target.name == 'genre' && e.target.length <= 1) {
        setFormErrors({ ...formErrors, [e.target.name]: "playlist genre is required" })
    }
    else if (e.target.name == 'genre' && e.target.length <= 1) {
        setFormErrors({ ...formErrors, [e.target.name]: "playlist description is required" })
    }
    else if (e.target.name == 'description' && e.target.length <= 5) {
        setFormErrors({ ...formErrors, [e.target.name]: "playlist description needs to be more than 5 characters" })
    }
    else {
        setFormErrors({ ...formErrors, [e.target.name]: "" })
    }
    setPlaylist({ ...playlist, [e.target.name]: e.target.value })
}
  


  return (
    <div className='d-flex flex-row bg-success'>
    <Container className="d-flex flex-column py-2 col-12  bg-success" style={{height:"80vh",maxWidth:650}}>
        <Form.Control className="border-primary bg-light text-secondary"
        type="search"
        placeholder="Search Songs/Artists"
        value={searchKey}
        name="searchData"
        onChange={e=> setSearchKey(e.target.value)}
      />
      <div className="flex-grow-1 my-2 text-light bg-danger " style={{overflowY:"auto",maxWidth:600}}>
        
        {searchData.map((track,index)=>(
          <div key={index} className='d-flex flex-row col-10 mt-3 mx-4 align-items-center justify-content-left bg-secondary border border-dark '>
            <img src={`${track.album.images[2]["url"]}`} className='m-3 border border-light'/>
            <div className='d-flex flex-column align-items-left mt-5 '>
              <p>Song Title: {track.name}</p>
              <p>Song Artist: {track.artists[0]["name"]}</p> 
              <ButtonGroup className='row-12'>
                <Button  variant="primary"  onClick={() => { setPlayTrack(track) }}>Play</Button>
                <Button  variant="primary"  onClick={() => setTracks([...tracks, { name: track.name, artist: track.artists[0]["name"], image: track.album.images[2]["url"] }])}>+Add to Playlist</Button>
              </ButtonGroup>
            </div>
              
          
          
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
      <Container className='d-flex flex-column col-12  bg-success text-warning m-5' style={{height:"70vh",width:"60vh"}}>
            <h2>Create a Playlist</h2>
            <form onSubmit={handleSubmit} style={{overflowY:"auto"}}>
                <label htmlFor="title" className='form-label'>Title:</label>
                <input type="text" className='form-control mt-2'value={playlist.title} name="title" onChange={handleChange} />
                    {formErrors.title ? <p>{formErrors.title}</p> : null}
                    {errors.title ? <p>{errors.title.message}</p> : null}
                <label htmlFor="genre"className='form-label'>Genre</label>
                <input type="text" className='form-control mt-2'value={playlist.genre} name="genre" onChange={handleChange} />
                    {formErrors.genre ? <p>{formErrors.genre}</p> : null}
                    {errors.genre ? <p>{errors.genre.message}</p> : null}
                <label htmlFor="description"className='form-label'>Description</label>
                <input type="textarea" className='form-control mt-2'value={playlist.description} name="description" onChange={handleChange} />
                    {formErrors.description ? <p>{formErrors.description}</p> : null}
                    {errors.description ? <p>{errors.description.message}</p> : null}
                    

                 {tracks.map((track,index)=>(
                    <div key={index} className='d-flex flex-row  bg-danger mt-2'>
                      <hr />
                      <img src={`${track.image}`} alt="" className='mt-1'/>
                      <div className='d-flex flex row align-items-center justify-content-center'>
                        <h5 className='border-info text-warning'> Song Title: <span className='text-light'>{track.name}</span></h5>
                        <h5 className='border-info text-warning'> Song Artist: <span className='text-light'>{track.artist}</span></h5>
                      </div>
                      
                    </div>
                 ))}
                    
                {errors.tracks ? <p>{errors.tracks.message}</p> : null}

            </form>
                <button className='btn btn-primary col-12 mt-3'>+Create Playlist</button>
      </Container>

    </div>
  )
      }

export default CreatePlaylist