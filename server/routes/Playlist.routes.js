import {Router} from 'express'
import { createBook,getAllBooks,getOneBook,updateOneBook,deleteOneBook} from '../controllers/book.controller.js';
const router = Router();

router.route('/playlist/:id')
    .get(getOnePlaylist) //get one book
    .put(updateOnePlaylist) //update a book
    .delete(deletePlaylist); // delete a book

router.route('/playlists')
    .get(getAllPlaylists)
    .post(createPlaylist);
export default router;