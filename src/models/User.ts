import { model } from "mongoose";
import userSchema, { IUserSchema } from "../schema/User";

const UserModel = model<IUserSchema>("User", userSchema);

export default UserModel;
