import express from "express";
import * as batchController from "../controllers/batchController";
import { verifyJWT } from "../middleware/verifyJWT";

const batchRoutes = express.Router();

batchRoutes.use(verifyJWT);

batchRoutes
  .route("/")
  .get(batchController.getAllBatches)
  .post(batchController.createNewBatch)
  .patch(batchController.updateBatch)
  .delete(batchController.removeBatch);

batchRoutes.route("/mortality").post(batchController.daily);
batchRoutes.route("/weight").post(batchController.weight);
batchRoutes.route("/food").post(batchController.food);

export default batchRoutes;
