import { Schema } from "mongoose";
import { AviaryType } from "../types/aviaryTypes";
// import {AviaryType} from

export interface IAviarySchema extends AviaryType {
  _id: string;
}

const aviarySchema = new Schema<AviaryType>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

export default aviarySchema;
