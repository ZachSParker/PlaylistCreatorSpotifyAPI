import Playlist from "../models/Playlist.model.js";
// create one
async function createPlaylist(req, res) {
    try {
        const newPlaylist = await Playlist.create(req.body);
        res.json(newPlaylist);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
//read all
async function getAllPlaylists(req, res) {
    try {
        const allPlaylists = await Playlist.find(); // here is our query to find Users
        res.json(allPlaylists);
    } catch (error) {
        console.log(error);
        res.status(400).json(error); // here is our error response
    }
}
//read one
async function getOnePlaylist(req, res) {
    try {
        const foundPlaylist = await Playlist.findById(req.params.id);
        res.json(foundPlaylist);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
//update one by id
async function updateOnePlaylist(req, res) {
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const updatedPlaylist = await Playlist.findByIdAndUpdate(req.params.id, req.body, options);
        res.json(updatedPlaylist);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
//destroy one
async function deleteOnePlaylist(req, res) {
    try {
        const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
        res.json(deletedPlaylist);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export {
    createPlaylist,
    getAllPlaylists,
    getOnePlaylist,
    updateOnePlaylist,
    deleteOnePlaylist,
};