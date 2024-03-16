import {model, Schema} from 'mongoose';
const TrackSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Song name is required!"],
            minlength: [2, "Song  name must contain 2 characters or more!"],
            maxlength: [255, "Song name needs to be less than 255 characters long"]
        },
        artist: {
            type: String,
            required: [true, "artist is required!"],
            minlength: [2, "artist must be at least 2 characters long!"],
            maxlength: [100, "artist name needs to be less than 100 characters long"]
        },
        image: {
            type: String,
            required: [true, "image of your Song is required!"],
        }
        
    },
    { timestamps: true }
);
const Track = model("Track", TrackSchema);
export default Track;