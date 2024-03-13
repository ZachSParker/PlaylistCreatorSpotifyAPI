import { useState,useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route} 
  from 'react-router-dom';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [spotifyURL,setSpotifyURL] = useState({
    CLIENT_ID : "1a2a1a5f4bb745928d1de9e85e80d737",
    REDIRECT_URI:"http://localhost:5173",
    AUTH_ENDPOINT:"https://accounts.spotify.com/authorize",
    RESPONSE_TYPE:"token"
  })
  const [token,setToken] = useState("")
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    if(!token && hash){
      token = hash.substring(1).split("&").find(element => element.startsWith("access_token")).split("=")[1]
      // console.log(token)
      window.location.hash = ""
      window.localStorage.setItem("token",token)
      setToken(token);
    }
  },[])
  const logoutHandler = () =>{
    e.preventDefault()
    window.localStorage.removeItem("token")
    setToken("")

  }
  return (
    <>
      <div>
        <h1>Spotify Playlist Creator</h1>
        {!token ?
          <a href={`${spotifyURL.AUTH_ENDPOINT}?client_id=${spotifyURL.CLIENT_ID}&redirect_uri=${spotifyURL.REDIRECT_URI}&response_type=${spotifyURL.RESPONSE_TYPE}`}>Login to Spotify</a>
          : <button onClick={logoutHandler}>Logout from Spotify</button>}
      </div>
      
    </>
  )
}

export default App
