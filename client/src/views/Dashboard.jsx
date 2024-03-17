import {useEffect,useState,React} from 'react'
import axios from 'axios'
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
    <div>

      {playlists.map((item)=>(
        <div key={item._id}>
          <p>{item.title}</p>
          <p>{item.genre}</p>
          <p>{item.description}</p>
            <div>
              {item.tracks.map((item)=>(
                <div key={item}>
                  <p>{item.name}</p>
                  <p>{item.artist}</p>
                  <img src={`${item.image}`}/>
                </div>
              ))}
            </div>
        </div>
      ))}
    </div>
  )
}

export default Dashboard