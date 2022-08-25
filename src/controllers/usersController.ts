import UserModel from "../models/User";
import AviaryModel from "../models/Aviary";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

export const getAllUsers = asyncHandler(async (req: Request, res: any) => {
  const users = await UserModel.find().select("-password").lean();

  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

export const createNewUser = asyncHandler(async (req: Request, res: any) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const duplicate = await UserModel.findOne({ username }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Invalid username" });
  }
  const hashedPwd = await bcrypt.hash(password, 10);
  const userObject = { username, password: hashedPwd, email };
  const user = await UserModel.create(userObject);

  if (user) {
    res.status(201).json({ mesage: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

export const updateUser = asyncHandler(async (req: Request, res: any) => {
  const { id, username, roles, active, password } = req.body;
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }
  const user = await UserModel.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const duplicate = await UserModel.findOne({ username }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }
  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.username} updated` });
});

export const deleteUser = asyncHandler(async (req: Request, res: any) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }
  const aviary = await AviaryModel.findOne({ user: id }).lean().exec();
  if (aviary) {
    return res.status(400).json({ mesage: "User has assigned aviary" });
  }
  const user = await UserModel.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const result = await user.deleteOne();
  const reply = `Username ${result.username} with ID ${result._id} deleted`;
  res.json(reply);
});
