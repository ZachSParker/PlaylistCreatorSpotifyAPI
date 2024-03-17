import {useEffect,useState,React} from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
const Dashboard = () => {
  const [playlists,setPlaylists] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:8000/api/playlists")
      .then((res)=>{
        console.log(res.data)
        setPlaylists(res.data)   
      }).catch((err)=>{
        console.log(err)
      })

  },[])
  return (
    <Container className='d-flex flex-column'>
      {playlists.map((item)=>(
        <div className='d-flex flex-column ' key={item._id}>
          <p>Playlist Title: {item.title}</p>
          <p>Genre {item.genre}</p>
            <div className='d-flex flex-row'>
              {item.tracks.map((item)=>(
                <div key={item} className='border-primary'>
                  <p>Song Name:{item.name}</p>
                  <p>Song Artist{item.artist}</p>
                  <img src={`${item.image}`} className='mt-3 '/>
                </div>
              ))}
            </div>
        </div>
      ))}
    </Container>
  )
}

export default Dashboard