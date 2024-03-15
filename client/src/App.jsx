import {useState,useEffect,React} from 'react'
import {
  BrowserRouter,
  Routes,
  Route} 
  from 'react-router-dom';
  import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Dashboard from './views/Dashboard';
import CreatePlaylist from './views/CreatePlaylist';
import OnePlaylist from './views/OnePlaylist';
import UpdatePlaylist from './views/UpdatePlaylist';


function App() {
  
  const [authToken,setAuthToken] = useState("");
  
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    if(!token && hash){
      token = hash.substring(1).split("&").find(element => element.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token",token)
      window.history.pushState({},null,"/")
      
      
    }
    setAuthToken(token);
    
  },[authToken])
  return (
    <>

      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/playlists/new" element={<CreatePlaylist authToken={authToken}/>}/>
          <Route path="/playlist/:id/details" element={<OnePlaylist/>} />
          <Route path="/playlist/:id/edit" element={<UpdatePlaylist/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
