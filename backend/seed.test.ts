import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./src/models/User";
import Post from "./src/models/Post";

export const seed = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {dbName: process.env.DATABASE_NAME});

        const collections = await mongoose.connection.db.collections()

        for (let collection of collections) {
            await collection.drop()
        }

        //valid users for test
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash("12345678", salt);

        let newUser = new User({
            firstName: "Bahar",
            lastName: "Papi",
            email: "papibahar@gmail.com",
            password: passwordHash,
            picturePath: "bahar.jpg",
            friends: [],
            location: "Canada",
            occupation: "Test"
        });

        let {_id: user1Id} = await newUser.save();

        newUser = new User({
            firstName: "Amir Arsalan",
            lastName: "Papi",
            email: "amir.arsalan@gmail.com",
            password: passwordHash,
            picturePath: "amir.jpg",
            friends: [],
            location: "England",
            occupation: "Test"
        });

        let {_id: user2Id} = await newUser.save();


        newUser = new User({
            firstName: "Naser",
            lastName: "Papi",
            email: "naser.papi.dev@gmail.com",
            password: passwordHash,
            picturePath: "abc.jpg",
            friends: [user1Id, user2Id],
            location: "USA",
            occupation: "Test"
        });

        const savedUser = await newUser.save();
        const {_id: userId, firstName, lastName, location, picturePath: userPicturePath} = savedUser;

        let newPost = new Post({
            userId,
            firstName,
            lastName,
            location,
            userPicturePath,
            picturePath: 'abc.jpg',
            description: 'test',
            likes: {},
            comments: ['test comment 1']
        })

        await newPost.save();

    } catch (err) {
        console.log(`DB connection error: ${err}`)
    }
}

export const createFriendUser = async () => {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash("12345678", salt);

    let newUser = new User({
        firstName: "Zahra",
        lastName: "Shamivand",
        email: "zari@gmail.com",
        password: passwordHash,
        picturePath: "zari.jpg",
        friends: [],
        location: "USA",
        occupation: "Test"
    });

    return await newUser.save();
}

export const getExistUser = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {dbName: process.env.DATABASE_NAME});
        return await User.find().limit(1);
    } catch (err) {
        console.log(`DB connection error: ${err}`)
    }
}

export const getExistPost = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {dbName: process.env.DATABASE_NAME});
        return await Post.find().limit(1);
    } catch (err) {
        console.log(`DB connection error: ${err}`)
    }
}