import express from "express";
import * as batchController from "../controllers/batchController";
import { verifyJWT } from "../middleware/verifyJWT";

const batchRoutes = express.Router();

batchRoutes.use(verifyJWT);

batchRoutes
  .route("/")
  .get(batchController.getAllBathes)
  .post(batchController.createNewBatch)
  .patch(batchController.updateBatch)
  .delete(batchController.deleteUser);

export default batchRoutes;
