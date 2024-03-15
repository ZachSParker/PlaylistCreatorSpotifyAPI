import {useState,React} from 'react'
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
  
  const [token,setToken] = useState("");
  return (
    <>

      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/playlists/new" element={<CreatePlaylist token={token}/>}/>
          <Route path="/playlist/:id/details" element={<OnePlaylist/>} />
          <Route path="/playlist/:id/edit" element={<UpdatePlaylist/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
