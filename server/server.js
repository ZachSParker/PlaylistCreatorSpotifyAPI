import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';
import router from './routes/Playlist.routes.js';
const app = express();
app.use(express.json(), cors());
app.use('/api',router)
dotenv.config();
const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT;

dbConnect();
app.listen(PORT, () =>
    console.log(`Listening on port: ${PORT}`)
);