import mng from "mongoose";
import batchSchema, { IBatchSchema } from "../schema/Batch";

const BatchModel = mng.model<IBatchSchema>("Batch", batchSchema);

export default BatchModel;
