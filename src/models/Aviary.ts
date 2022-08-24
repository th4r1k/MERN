import { model } from "mongoose";
import aviarySchema, { IAviarySchema } from "../schema/Aviary";

const AviaryModel = model<IAviarySchema>("Aviary", aviarySchema);

export default AviaryModel;
