import {useState,useEffect,React} from 'react'
import { useParams,Link } from 'react-router-dom'
import { getOnePlaylist } from '../services/PlaylistService';

const OnePlaylist = () => {
    const [onePlaylist,setOnePlaylist] = useState({
      name:"",
      genre:"",
      description:"",
      tracks:[]
    });
    const {id} = useParams();

    useEffect (()=>{
        getOnePlaylist(id)
        .then((res)=>{
            console.log(res);
            setOnePlaylist(res);
            window.history.pushState({},null,"/")
        })
        .catch((err)=>{
            console.log(err);
        });
    },[id])
    
  return (
    <div>
      <div className='bg-danger text-light d-flex flex-column align-items-center'>
        <p className='text-light'>Playlist Name: {onePlaylist.title}</p>
        <p className='text-light'>Genre:{onePlaylist.genre}</p>
        <p className='text-warning'>{onePlaylist.description}</p>
      </div>
      
      <div className='d-flex flex-row border border-warning'>
        {onePlaylist.tracks.map((item) => (
          <div key={item} className='d-flex bg-secondary'>
            <img src={`${item.image}`} className='m-3 border border-light m-3 ' style={{width:"128px",height:"128px"}}/>
            <div className='d-flex flex-column'>
              <h5 className='  text-warning m-3'>Song Name: {item.name}</h5>
              <h5 className='  text-warning m-3'>Song Artist: {item.artist}</h5>
            </div>

          </div>
          
              
        ))}
      </div>
    </div>
  )
}

export default OnePlaylist