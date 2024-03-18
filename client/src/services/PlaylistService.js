import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:8000/api'
})

function getAllPlaylists() {
    return http.get('/playlists')
    .then(res=>res.data)
    .catch(err=> {
        throw err;
    });
}

function getOnePlaylist(id){
    return http.get(`/playlist/${id}`)
    .then(res=> res.data)
    .catch(err=> {
        throw err;
    })
}

function createPlaylist(playlist){
    return http.post(`/playlists`,playlist)
    .then(res=>res.data)
    .catch(err=>{
        throw err;
    })
}

function updateOnePlaylist(playlist){
    return http.put(`/playlist/${playlist._id}`,playlist)
    .then(res=>res.data)
    .catch(err=>{
        throw err;
    })
}

function deleteOnePlaylist(id){
    return http.delete(`/playlist/${id}`)
    .then(res=> res.data)
    .catch(err=>{
        throw err;
    })
}

export{
    getAllPlaylists,
    createPlaylist,
    getOnePlaylist,
    updateOnePlaylist,
    deleteOnePlaylist,
}