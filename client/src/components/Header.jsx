import {useState,useEffect,React} from 'react'
import dotenv from 'dotenv';
import axios from 'axios';



const Header = () => {
  
  const [spotifyURL,setSpotifyURL] = useState({
    REDIRECT_URI:"http://localhost:5173",
    AUTH_ENDPOINT:"https://accounts.spotify.com/authorize",
    RESPONSE_TYPE:"token"
  })
  const[viteVar,setViteVar] = useState(import.meta.env.VITE_CLIENT_ID)
  const [searchKey,setSearchKey] = useState("");
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
      console.log(viteVar)
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
        limit:5
        

      }
      
    })

    console.log(data)
  }
  const trackSearch = async (e) =>{
    e.preventDefault();
    const{data} = await axios.get("https://api.spotify.com/v1/search",{
      headers:{
        Authorization:`Bearer ${token}`
      },
      params:{
        q: searchKey,
        type:"track",
        limit:10
        

      }
      
    })
    console.log(data)
  }

  return (
    <div>
        <h1>Spotify Playlist Creator </h1>
        {!token ?
          
          <a href={`${spotifyURL.AUTH_ENDPOINT}?client_id=${viteVar}&redirect_uri=${spotifyURL.REDIRECT_URI}&response_type=${spotifyURL.RESPONSE_TYPE}`}>Login to Spotify</a>
          : <button onClick={logoutHandler}>Logout from Spotify</button>}
        {token ?
        <form onSubmit={artistSearch}>
          <input type="text" placeholder='search for artists/songs' onChange={e=> setSearchKey(e.target.value)}/>
          <button type="submit">Search</button>
        </form>
        :<h5>Please Login</h5>
        }
        {token ?
        <form onSubmit={trackSearch}>
          <input type="text" placeholder='search for artists/songs' onChange={e=> setSearchKey(e.target.value)}/>
          <button type="submit">Search</button>
        </form>
        :<h5>Please Login</h5>
        }
      </div>
      
  )
}

export default Header