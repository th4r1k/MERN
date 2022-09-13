import mng from "mongoose";
import { BatchTypes } from "../types/batchTypes";

export interface IBatchSchema extends BatchTypes {
  _id: string;
}

const batchSchema = new mng.Schema<BatchTypes>({
  batch: {
    type: String,
    ref: "Aviary",
    required: true,
  },
  arrived: {
    type: { quantity: Number, date: String },
  },
  departure: {
    type: { quantity: Number, date: String },
  },
  mortality: {
    type: [
      { natural: Number, locomotor: Number, cachectic: Number, date: String },
    ],
  },
  food: {
    type: [{ date: String, quantity: Number }],
  },

  cost: {
    type: [{ name: String, value: Number }],
  },

  payment: {
    type: Number,
  },
});

export default batchSchema;
