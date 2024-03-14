import React from 'react'
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
  
  
  return (
    <>

      <BrowserRouter>
        <Header/>
        <Routes basename="/playlist">
          <Route path="" element={<Dashboard/>} />
          <Route path="/new" element={<CreatePlaylist/>}/>
          <Route path="/:id/details" element={<OnePlaylist/>} />
          <Route path="/:id/edit" element={<UpdatePlaylist/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
