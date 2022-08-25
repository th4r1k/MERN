import mng from "mongoose";

export interface AviaryType {
  user: typeof mng.Schema.Types.ObjectId;
  title: string;
}
