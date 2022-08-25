import mng from "mongoose";
import aviarySchema, { IAviarySchema } from "../schema/Aviary";

const AviaryModel = mng.model<IAviarySchema>("Aviary", aviarySchema);

export default AviaryModel;
