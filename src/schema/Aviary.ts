import mng from "mongoose";
import { AviaryType } from "../types/aviaryTypes";
// import {AviaryType} from

export interface IAviarySchema extends AviaryType {
  _id: string;
}

const aviarySchema = new mng.Schema<AviaryType>({
  user: {
    type: mng.Schema.Types.ObjectId,
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
