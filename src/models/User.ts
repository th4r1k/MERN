import mng from "mongoose";
import userSchema, { IUserSchema } from "../schema/User";

const UserModel = mng.model<IUserSchema>("User", userSchema);

export default UserModel;
