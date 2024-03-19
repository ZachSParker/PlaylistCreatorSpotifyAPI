import {useState,useEffect,React} from 'react'
import { useParams,Link } from 'react-router-dom'
import { getOnePlaylist } from '../services/PlaylistService';
import { Button,Collapse } from 'react-bootstrap';
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
      <div className='bg-danger text-light d-flex flex-column align-items-center'>
        <p className='text-light'>Playlist Name: {onePlaylist.title}</p>
        <p className='text-light'>Genre:{onePlaylist.genre}</p>
        <p className='text-warning'>{onePlaylist.description}</p>
      </div>
      <div className='d-flex flex-row border border-warning'>
        {onePlaylist.tracks.map((item) => (
          <div key={item} className='d-flex bg-secondary'>
            <img src={`${item.image}`} className='m-3 border border-light ' />
            <div className='d-flex flex-column'>
              <h5 className='  text-warning m-3'>Song Name: {item.name}</h5>
              <h5 className='  text-warning m-3'>Song Artist: {item.artist}</h5>
              <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                click
              </Button>
              <Collapse in={open}>
                <div id="example-collapse-text">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                  terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                  labore wes anderson cred nesciunt sapiente ea proident.
                </div>
              </Collapse>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default OnePlaylist