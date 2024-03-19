import {React,useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { getOnePlaylist, updateOnePlaylist } from '../services/PlaylistService.js';

const UpdatePlaylist = (props) => {
  const [playlist,setPlaylist] = useState({
    name:"",
    genre:"",
    description:"",
    tracks:[]
  })
  const {id} = useParams();
  const navigate = useNavigate();
  const [errors,setErrors] = useState({})
  const [formErrors,setFormErrors] = useState({})
  useEffect (()=>{
      getOnePlaylist(id)
      .then((res)=>{
          console.log(res);
          setPlaylist(res);
      })
      .catch((err)=>{
          console.log(err);
      });
  },[id])
  const submitHandler = (e) =>{
      e.preventDefault();
      updateOnePlaylist(playlist)
      .then((res)=>{
          console.log(res)
          setPlaylist({
              title:"",
              genre:"",
              description:"",
          })
          navigate("/")
      })
      .catch((err)=>{
          console.log(err);
          setErrors(err.response.data.errors)
      });
      
  }
  const handleChange = (e) => {
      if (e.target.name == 'title' && e.target.value.length <= 1) {
          setFormErrors({ ...formErrors, [e.target.name]: "Playlist name is required" })
          //this wireframe had minimal validations, hopefully this is okay?
      }
      else if (e.target.name == 'genre' && e.target.length <= 255) {
          setFormErrors({ ...formErrors, [e.target.name]: "playlist genre needs to be less than 255 chars" })
      }
      else if (e.target.name == 'genre' && e.target.length <= 1) {
          setFormErrors({ ...formErrors, [e.target.name]: "playlist genre is required" })
      }
      else if (e.target.name == 'genre' && e.target.length <= 1) {
          setFormErrors({ ...formErrors, [e.target.name]: "playlist description is required" })
      }
      else if (e.target.name == 'description' && e.target.length <= 5) {
          setFormErrors({ ...formErrors, [e.target.name]: "playlist description needs to be more than 5 characters" })
      }
      else {
          setFormErrors({ ...formErrors, [e.target.name]: "" })
      }
      
      setPlaylist({ ...playlist, [e.target.name]: e.target.value })
  }
return (
  <div>
          <h2>Edit {playlist.title}</h2>
          <form onSubmit={submitHandler}>
              <label htmlFor="PlaylistName" className='form-label mb-3'>Title</label>
              <input className='form-control mb-3' type="text" value={playlist.title} name="title" onChange={handleChange} />
                  {formErrors.title ? <p>{formErrors.title}</p> : null}
                  {errors.title ? <p>{errors.title.message}</p> : null}
              <label className='form-label' htmlFor="PlaylistNumber">Genre</label>
              <input className='form-control mb-3' type="text" value={playlist.genre} name="genre" onChange={handleChange} />
                  {formErrors.genre ? <p>{formErrors.genre}</p> : null}
                  {errors.genre ? <p>{errors.genre.message}</p> : null}
              <label className='form-label' htmlFor="PlaylistNumber">Description</label>
              <input className='form-control mb-3' type="text" value={playlist.description} name="description" onChange={handleChange} />
                  {formErrors.description ? <p>{formErrors.description}</p> : null}
                  {errors.description ? <p>{errors.description.message}</p> : null}
                  {playlist.tracks.map((track,index)=>(
                    <div key={index} className='d-flex flex-row border border-secondary bg-danger mt-2'>
                      <hr />
                      <img src={`${track.image}`} alt="" className='mt-1'/>
                      <div className='d-flex flex row align-items-center justify-content-center'>
                        <h5 className='border-info text-warning'> Song Title: <span className='text-light'>{track.name}</span></h5>
                        <h5 className='border-info text-warning'> Song Artist: <span className='text-light'>{track.artist}</span></h5>
                      </div>
                      
                    </div>
                 ))}
              <button className='form-control mb-3 btn btn-primary'>Update</button>

          </form>
      </div>
)
}
export default UpdatePlaylist;