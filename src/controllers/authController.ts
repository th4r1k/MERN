import UserModel from "../models/User";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

export const login = asyncHandler(async (req: Request, res: any) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await UserModel.findOne({ username }).exec();

  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: "Unauthorized" });
});
