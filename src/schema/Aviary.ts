import mng from "mongoose";
import { AviaryType } from "../types/aviaryTypes";

export interface IAviarySchema extends AviaryType {
  _id: string;
}

const aviarySchema = new mng.Schema<AviaryType>({
  user: {
    type: String,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

export default aviarySchema;
