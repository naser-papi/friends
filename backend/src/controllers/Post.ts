import express from "express";
import User, { IUserSchema } from "../models/User";
import Post, { IPostSchema } from "../models/Post";
import { IDoc } from "../models/GlobalTypes";

export const createPost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { userId, picturePath, description } = req.body;
  if (!userId || !picturePath || !description) {
    next(new Error("please set required infos"));
  }
  const user = (await User.findById(userId)) as IDoc<IUserSchema>;
  const { firstName, lastName, location, picturePath: userPicturePath } = user;
  const newPost = new Post({
    userId,
    firstName,

    lastName,
    location,
    userPicturePath,
    picturePath,
    description,
    likes: {},
    comments: []
  });

  const savedPost = await newPost.save();

  res.status(200).json(savedPost);
};

export const getPostFeed = async (req: express.Request, res: express.Response) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};

export const likePost = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (!userId) next(new Error("invalid user id"));
  const post = (await Post.findById(id)) as IDoc<IPostSchema>;
  if (!post) next(new Error("invalid post id"));

  const isLiked = post.likes.get(userId);
  if (isLiked) {
    post.likes.delete(userId);
  } else {
    post.likes.set(userId, true);
  }

  const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true });

  return res.status(200).json(updatedPost);
};
