import Playlist from "../models/Playlist.model.js";
import Track from "../models/Track.model.js";

// create one
async function createPlaylist(req, res) {
    try {
        let trackIds = [];
        const newPlaylist = await Playlist.create(req.body.playlist)
            .then((playlist)=>{
                 Promise.all(req.body.tracks.map(t =>(
                    Playlist.updateOne(
                        {_id:playlist._id},
                        {$push:{tracks:Track.create(t)}},
                        console.log(this.playlist.tracks)
                    )
                )))
                    //
        })

        res.json(newPlaylist);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }}

// async function createPlaylist(req, res) {
//     try {
//         const newPlaylist = await Playlist.create(req.body);
//         res.json(newPlaylist);
//     } catch (error) {
//         console.log(error);
//         res.status(400).json(error);
//     }
// }

export {
    createPlaylist
};