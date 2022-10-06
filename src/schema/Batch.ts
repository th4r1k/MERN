import mng from "mongoose";
import { BatchTypes } from "../types/batchTypes";

export interface IBatchSchema extends BatchTypes {
  _id: string;
}

const batchSchema = new mng.Schema<BatchTypes>({
  aviary: {
    type: String,
    ref: "Aviary",
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  arrived: {
    quantity: { type: Number },
    date: { type: String },
  },
  departure: {
    quantity: { type: Number },
    date: { type: String },
  },
  mortality: [
    {
      natural: { type: Number },
      locomotor: { type: Number },
      cachectic: { type: Number },
      date: { type: String },
      _id: { id: false },
    },
  ],
  weight: [
    {
      value: { type: Number },
      date: { type: String },
    },
  ],
  // mortality: {
  //   type: [
  //     { natural: Number, locomotor: Number, cachectic: Number, date: String },
  //   ],
  // },
  food: [
    { date: { type: String }, quantity: { type: Number }, _id: { id: false } },
  ],
  // food: {
  //   type: [{ date: String, quantity: Number }],
  // },

  cost: [
    {
      name: { type: String },
      value: { type: Number },
    },
  ],
  // cost: {
  //   type: [{ name: String, value: Number }],
  // },

  payment: {
    type: Number,
  },
});

export default batchSchema;
