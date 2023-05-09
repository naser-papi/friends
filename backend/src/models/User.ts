import mongoose from "mongoose";
import {validateEmail} from "../helpers/Utils";

export interface IUserSchema {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    picturePath: string,
    friends: string[],
    location: string,
    occupation: string,
    viewedProfile: number,
    impressions: number,
    _id: string,
}

const UserSchema = new mongoose.Schema<IUserSchema>({
    firstName: {
        type: String,
        required: true,
        min: 2,
        msx: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        msx: 50
    },
    email: {
        type: String,
        max: 50,
        unique: true,
        required: [true, 'Email Address is required'],
        validate: {
            validator: validateEmail,
            message: 'invalid Email Address or Email exist'
        }
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    picturePath: {
        type: String,
        default: ""
    },
    friends: {
        type: [String],
        default: []
    },
    location: String,
    occupation: String,
    viewedProfile: {
        type: Number,
        default: 0
    },
    impressions: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);
export default User;