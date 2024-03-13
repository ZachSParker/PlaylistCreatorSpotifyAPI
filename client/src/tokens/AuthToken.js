import { useState,useEffect } from "react";




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
      console.log(token)
      window.location.hash = ""
      window.localStorage.setItem("token",token)
      
    }
    setToken(token);
  },[])