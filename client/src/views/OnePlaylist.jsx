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
        })
        .catch((err)=>{
            console.log(err);
        });
    },[id])
  return (
    <div>
      <div className='bg-success text-light'>
        <p>Playlist Name: {onePlaylist.title}</p>
        <p>Genre:{onePlaylist.genre}</p>
        <p>{onePlaylist.description}</p>
      </div>
      <div className='d-flex flex-row border border-warning'>
        {item.tracks.map((item) => (
          <div key={item} className='d-flex bg-secondary'>
            <img src={`${item.image}`} className='m-3 border border-light ' />
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