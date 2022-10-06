import AviaryModel from "../models/Aviary";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { UserType } from "../types/userTypes";
import {
  createUser,
  deleteUsr,
  encryptPwd,
  findMe,
  findUser,
  getUsers,
  updater,
  verifyDuplicate,
} from "../services/usersServices";

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const users = await getUsers();

    if (!users?.length) {
      return res.status(400).json({ message: "No users found" });
    }
    res.json(users);
  }
);

export const createNewUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { username, password, email }: UserType = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const duplicate = await verifyDuplicate(username);
    if (duplicate) {
      return res.status(409).json({ message: "Invalid username" });
    }

    const user = await createUser({ username, password, email });
    if (user) {
      res.status(201).json({ mesage: `New user ${username} created` });
    } else {
      res.status(400).json({ message: "Invalid user data received" });
    }
  }
);

export const updateUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { id, username, roles, active, password }: UserType = req.body;
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
    const user = await findUser(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const duplicate = await verifyDuplicate(username);
    if (duplicate && duplicate?._id.toString() !== id) {
      return res.status(409).json({ message: "Duplicate username" });
    }
    user.username = username;
    user.roles = roles;
    user.active = active;

    if (password) {
      user.password = await encryptPwd(password);
    }

    await updater(user);
    res.json({ message: `${user.username} updated` });
  }
);

export const deleteUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID Required" });
    }

    const aviary = await AviaryModel.findOne({ user: id }).lean().exec();
    if (aviary) {
      return res.status(400).json({ mesage: "User has assigned aviary" });
    }

    const user = await findUser(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    await deleteUsr(user);
    res.json(`Username ${user.username} with ID ${user._id} deleted`);
  }
);

export const getUser = asyncHandler(
  async (req: any, res: Response): Promise<any> => {
    const me: any = req.user;

    const users = await findMe(me);
    // console.log(users);

    res.json(users);
  }
);
