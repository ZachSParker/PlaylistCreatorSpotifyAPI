import {useState,useEffect,React} from 'react'
import dotenv from 'dotenv';
import axios from 'axios';
const Header = () => {
  const [spotifyURL,setSpotifyURL] = useState({
    CLIENT_ID : "1a2a1a5f4bb745928d1de9e85e80d737",
    REDIRECT_URI:"http://localhost:5173",
    AUTH_ENDPOINT:"https://accounts.spotify.com/authorize",
    RESPONSE_TYPE:"token"
  })
  const [searchKey,setSearchKey] = useState("");
  const [token,setToken] = useState("")
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    // console.log(spotifyURL.CLIENT_ID);
    if(!token && hash){
      token = hash.substring(1).split("&").find(element => element.startsWith("access_token")).split("=")[1]
      
      window.location.hash = ""
      window.localStorage.setItem("token",token)
      
    }
    setToken(token);
  },[token])

  const logoutHandler = (e) =>{
    e.preventDefault()
    window.localStorage.removeItem("token")
    setToken("")

  }
  const artistSearch = async (e) =>{
    e.preventDefault();
    const{data} = await axios.get("https://api.spotify.com/v1/search",{
      headers:{
        Authorization:`Bearer ${token}`
      },
      params:{
        q: searchKey,
        type:"artist",
        type:"track",
        limit:5
        

      }
      
    })
    console.log(data)

  }
  return (
    <div>
        <h1>Spotify Playlist Creator</h1>
        {!token ?
          <a href={`${spotifyURL.AUTH_ENDPOINT}?client_id=${spotifyURL.CLIENT_ID}&redirect_uri=${spotifyURL.REDIRECT_URI}&response_type=${spotifyURL.RESPONSE_TYPE}`}>Login to Spotify</a>
          : <button onClick={logoutHandler}>Logout from Spotify</button>}
        {token ?
        <form onSubmit={artistSearch}>
          <input type="text" placeholder='search for artists/songs' onChange={e=> setSearchKey(e.target.value)}/>
          <button type="submit">Search</button>
        </form>
        :<h5>Please Login</h5>
        }
      </div>
      
  )
}

export default Header