import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import router from './routes/Playlist.routes.js';
// import Genius from 'genius-lyrics';


const app = express();
// const Genius = require("genius-lyrics")
// const Client = new Genius.Client("top=secret-key");

app.use(express.json(), cors(),express.urlencoded({extended:true}));
app.use('/api',router)
// app.get('/lyrics', async (req,res)=>{
//     const searches = await Client.songs.search(req.query.track)
//     const firstSong = searches[0]
//     console.log(firstSong,"song found lv 18 server.js")

//     const lyrics = await firstSong.lyrics() || "No found Lyrics for this song!"
//     res.json({lyrics})
// })
dotenv.config();

const PORT = process.env.PORT;

dbConnect();
app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);