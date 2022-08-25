import express from "express";
import {
  createNewAviary,
  deleteAviary,
  getAllAviaries,
  updateAviary,
} from "../controllers/aviaryController";

const aviaryRoutes = express.Router();

aviaryRoutes
  .route("/")
  .get(getAllAviaries)
  .post(createNewAviary)
  .patch(updateAviary)
  .delete(deleteAviary);

export default aviaryRoutes;
