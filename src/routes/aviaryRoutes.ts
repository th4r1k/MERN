import express from "express";
import * as aviaryController from "../controllers/aviaryController";
import { verifyJWT } from "../middleware/verifyJWT";

const aviaryRoutes = express.Router();

aviaryRoutes.use(verifyJWT);

aviaryRoutes
  .route("/")
  .get(aviaryController.getAllAviaries)
  .post(aviaryController.createNewAviary)
  .patch(aviaryController.updateAviary)
  .delete(aviaryController.deleteAviary);

export default aviaryRoutes;
