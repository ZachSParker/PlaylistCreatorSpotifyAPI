import {Router} from 'express'
import { createPlaylist,getAllPlaylists,getOnePlaylist,updateOnePlaylist,deleteOnePlaylist} from '../controllers/Playlist.controller.js';

const router = Router();

router.route('/playlist/:id')
    .get(getOnePlaylist) //get one book
    .put(updateOnePlaylist) //update a book
    .delete(deleteOnePlaylist); // delete a book

router.route('/playlists')
    .get(getAllPlaylists)
    .post(createPlaylist);
export default router;