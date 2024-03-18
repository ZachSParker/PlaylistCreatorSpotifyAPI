import {useState,useEffect,React} from 'react'
import {Nav,Navbar,Container} from 'react-bootstrap'



const Header = () => {
  
  const [spotifyURL,setSpotifyURL] = useState({
    REDIRECT_URI:"http://localhost:5173",
    AUTH_ENDPOINT:"https://accounts.spotify.com/authorize",
    RESPONSE_TYPE:"token",
    scope:"streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
  })
  const[viteVar,setViteVar] = useState(import.meta.env.VITE_CLIENT_ID)
  const [token,setToken] = useState("");
  // const [searchData,setSearchData] = useState({
  //   searchKey:"",
  //   recentSearches:[],

  // })
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    // console.log(spotifyURL.CLIENT_ID);
    if(!token && hash){
      token = hash.substring(1).split("&").find(element => element.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token",token)
      window.history.pushState({},null,"/")
      
    }
    setToken(token);
  },[token])

  const logoutHandler = (e) =>{
    e.preventDefault()
    window.localStorage.removeItem("token")
    setToken("")

  }
 

  return (
    <div className='bg-success text-light'>
      <Navbar expand="lg" className="bg-body-primary">
        <Container className='bg-primary'>
          <Navbar.Brand className='text-light' href="/">See all Playlists</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="text-light" href="/playlists/new">+Create Playlist</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <h3>Spotify Playlist Creator </h3>
        {!token ?
          
          <a className='btn btn-warning text-secondary col-3 m-3' href={`${spotifyURL.AUTH_ENDPOINT}?client_id=${viteVar}&redirect_uri=${spotifyURL.REDIRECT_URI}&response_type=${spotifyURL.RESPONSE_TYPE}&scope=${spotifyURL.scope}`}>Login to Spotify</a> 
          : <button className='btn btn-warning text-secondary col-3 m-3' onClick={logoutHandler}>Logout from Spotify</button>}
      </div>
      
      
      
  )
}

export default Header