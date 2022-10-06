import UserModel from "../models/User";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../utils/httpException";
import { UserReturnType, UserType } from "../types/userTypes";

export async function getUsers(): Promise<UserType[]> {
  try {
    const users = await UserModel.find().select("-password").lean();
    return users;
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function createUser(user: UserType): Promise<UserReturnType> {
  const hashedPwd = await encryptPwd(user.password);
  const userObject = {
    username: user.username,
    password: hashedPwd,
    email: user.email,
  };

  try {
    const newUser = await UserModel.create(userObject);
    return {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      roles: newUser.roles,
    };
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function verifyDuplicate(
  username: string
): Promise<UserReturnType | null> {
  try {
    const user = await UserModel.findOne({ username })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();
    return user;
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function findUser(id: string) {
  try {
    const user = await UserModel.findById(id).exec();
    return user;
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function findUserByName(username: string) {
  try {
    const user = await UserModel.findOne({ username }).exec();
    return user;
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function encryptPwd(password: string): Promise<string> {
  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    return hashedPwd;
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function decryptPwd(
  password: string,
  userpwd: string
): Promise<boolean> {
  try {
    const pwd = await bcrypt.compare(password, userpwd);
    return pwd;
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function deleteUsr(user: any) {
  try {
    user.deleteOne();
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function updater(user: any) {
  try {
    // await UserModel.updateOne(user);
    await user.save();
  } catch (err) {
    throw ErrorHandler(err);
  }
}

export async function findMe(username: string): Promise<any | null> {
  try {
    const user = await UserModel.findOne({ username })
      .select("-password")
      .select("-email")
      .select("-username")
      .select("-active")
      .select("-__v")

      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();
    return user;
  } catch (err) {
    throw ErrorHandler(err);
  }
}
