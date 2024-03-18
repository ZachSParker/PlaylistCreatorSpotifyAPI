import {useEffect,useState,React} from 'react'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
import { Container,Button,ButtonGroup } from 'react-bootstrap'
import { deleteOnePlaylist, getAllPlaylists } from '../services/PlaylistService'
const Dashboard = () => {
  const [playlists,setPlaylists] = useState([])
  const navigate = useNavigate();
  useEffect(()=>{
    getAllPlaylists()
      .then((res)=>{
        console.log(res)
        setPlaylists(res)   
      }).catch((err)=>{
        console.log(err)
      })

  },[])
  const deletePlaylist = (id) => {
    deleteOnePlaylist(id)
      .then((res) => {
        console.log(res)
        let filteredPlaylists = playlists.filter((playlist,index)=> {
          playlist._id !== id; 
        })
        setPlaylists(filteredPlaylists)
        getAllPlaylists()
        .then((res)=>{
          setPlaylists(res)
        }).catch((err) => {
          console.log(err);
        });

        
        navigate("/")
        console.log(playlists)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Container className='d-flex flex-column'>
      {playlists.map((item)=>(
        <div className='d-flex flex-column ' key={item._id}>
          <p>Playlist Title: {item.title}</p>
          <p>Genre {item.genre}</p>
          <ButtonGroup className='row-12'>
                    <Button  variant="primary"><Link to={`/playlist/${item._id}`} className='text-light'>Edit Playlist </Link></Button>
                    <Button  variant="primary"  onClick={ ()=>{deletePlaylist(`${item._id}`)}}>Delete</Button>
          </ButtonGroup>
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