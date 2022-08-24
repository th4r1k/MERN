import { Schema } from "mongoose";
import { UserType } from "../types/userTypes";
import { emailRegex } from "../utils/emailRegex";

export interface IUserSchema extends UserType {
  _id: string;
}

const userSchema = new Schema<UserType>({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    min: [6, "Email must be at least 6 characters"],
    max: [50, "Email must be less then 50 characters"],
    match: [emailRegex, "Please add a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    min: [6, "Password must be at least 6 characters"],
    max: [50, "Password must be less then 50 characters"],
  },
  roles: [
    {
      type: String,
      default: "Granjeiro",
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

export default userSchema;
