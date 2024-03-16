import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import router from './routes/Playlist.routes.js';
import lyricsFinder from 'lyrics-finder';


const app = express();

app.use(express.json(), cors(),express.urlencoded({extended:true}));
app.use('/api',router)
app.get('/lyrics', async (req,res)=>{
    const lyrics = await lyricsFinder(req.query.artist,req.query.track) || "No found Lyrics for this song!"
    res.json({lyrics})
})
dotenv.config();
const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT;

dbConnect();
app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);