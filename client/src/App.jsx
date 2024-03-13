import { useState,useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route} 
  from 'react-router-dom';
import AuthToken from '../src/tokens/AuthToken.js';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const logoutHandler = (e) =>{
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
