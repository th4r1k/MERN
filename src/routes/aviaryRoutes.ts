import express from "express";
import * as aviaryController from "../controllers/aviaryController";

const aviaryRoutes = express.Router();

aviaryRoutes
  .route("/")
  .get(aviaryController.getAllAviaries)
  .post(aviaryController.createNewAviary)
  .patch(aviaryController.updateAviary)
  .delete(aviaryController.deleteAviary);

export default aviaryRoutes;
