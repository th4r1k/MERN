import mng, { FilterQuery, UpdateQuery } from "mongoose";
import { IAviarySchema } from "../schema/Aviary";

export interface AviaryType {
  id?: string;
  user: string;
  title: string;
}

export interface AviaryReturnType {
  _id: string;
  user: string;
  title: string;
}
