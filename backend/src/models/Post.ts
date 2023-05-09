import mongoose from "mongoose";
import {MapType} from "./GlobalTypes";

export interface IPostSchema {
    userId: string,
    firstName: string,
    lastName: string,
    location: string,
    description: string,
    picturePath: string,
    userPicturePath: string,
    likes: MapType,
    comments: string[]
}


const PostSchema = new mongoose.Schema<IPostSchema>({
    userId: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    location: String,
    description: {
        type: String,
        required: true,
    },
    picturePath: {
        type: String,
        required: true,
    },
    userPicturePath: String,
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        type: [String],
        default: []
    }
}, {timestamps: true})

export const Post = mongoose.model("Post", PostSchema);

export default Post;