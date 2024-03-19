import {useEffect,useState,React} from 'react'
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
        <div className='d-flex flex-column bg-danger m-5 align-items-center' key={item._id}>
          <h5 className=' text-light m-3'>Playlist Title: <Link to={`/playlist/${item._id}/details`}>{item.title}</Link></h5>
          <h5 className=' text-light m-3'>Genre:  {item.genre}</h5>
          
            <div className='d-flex flex-row border border-warning'>
              {item.tracks.map((item)=>(
                <div key={item} className='d-flex bg-secondary'>
                  <img src={`${item.image}`} className='m-3 border border-light '/>
                  <div className='d-flex flex-column'>
                  <h5 className='  text-warning m-3'>Song Name: {item.name}</h5>
                  <h5 className='  text-warning m-3'>Song Artist: {item.artist}</h5> 
                  </div>
                  
                </div>
              ))}
              
            </div>
            <ButtonGroup className='row-12'>
                    <Button className='row-6' variant="primary"><Link to={`/playlist/${item._id}/edit`} className='text-light'>Edit Playlist </Link></Button>
                    <Button className='row-6' variant="primary"  onClick={ ()=>{deletePlaylist(`${item._id}`)}}>Delete</Button>
            </ButtonGroup>
        </div>
      ))}
    </Container>
  )
}

export default Dashboard