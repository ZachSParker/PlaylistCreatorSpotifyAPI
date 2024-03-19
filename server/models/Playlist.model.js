import {model, Schema} from 'mongoose';
const PlaylistSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required!"],
            minlength: [2, "Title must contain 2 characters or more!"],
            maxlength: [255, "Title needs to be less than 255 characters long"]
        },
        genre: {
            type: String,
            required: [true, "genre is required!"],
            minlength: [2, "genre must be at least 2 characters long!"],
            maxlength: [255, "genre needs to be less than 255 characters long"]
        },
        description: {
            type: String,
            required: [true, "description of your playlist is required!"],
            minlength: [5, "description must be at least 5 characters long!"],
            maxlength: [255, "description needs to be less than 255 characters long"]
        },
        tracks:{
            type:Array,

            required:[true,"at least 1 song is required!"],
        }
    },
    { timestamps: true }
);
const Playlist = model("Playlist", PlaylistSchema);
export default Playlist;