import User, { IUserSchema } from "../models/User";
import Post from "../models/Post";
import express from "express";
import { IDoc } from "../models/GlobalTypes";

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  const user = (await User.findById(id)) as IUserSchema;
  if (!user) next(new Error("invalid user id"));
  delete user.password;
  delete user.friends;
  res.status(200).json(user);
};

export const getUseFriends = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { id } = req.params;
  const user = (await User.findById(id)) as IUserSchema;
  if (!user) next(new Error("invalid user id"));

  const friends = await Promise.all(user.friends.map((id) => User.findById(id)));

  const result = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => ({
    _id,
    firstName,
    lastName,
    occupation,
    location,
    picturePath
  }));

  res.status(200).json(result);
};
export const getUserPosts = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { id } = req.params;
  const user = (await User.findById(id)) as IUserSchema;
  if (!user) next(new Error("invalid user id"));

  const posts = await Post.find({ userId: id });
  res.status(200).json(posts);
};

export const addRemoveFriend = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { id, friendId } = req.params;
  const user = (await User.findById(id)) as IDoc<IUserSchema>;
  if (!user) next(new Error("invalid user id"));

  const friend = (await User.findById(friendId)) as IDoc<IUserSchema>;
  if (!friend) next(new Error("invalid user id"));

  if (!user.friends) {
    user.friends = [];
  }
  if (!friend.friends) {
    friend.friends = [];
  }
  if (user.friends.includes(friendId)) {
    user.friends = user.friends.filter((fId) => fId != friendId);
    friend.friends = friend.friends.filter((fId) => fId != id);
  } else {
    user.friends.push(friendId);
    friend.friends.push(id);
  }

  await user.save();
  await friend.save();

  const friends = await Promise.all(user.friends.map((id) => User.findById(id)));

  const result = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => ({
    _id,
    firstName,
    lastName,
    occupation,
    location,
    picturePath
  }));

  res.status(200).json(result);
};
