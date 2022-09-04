import express from "express";
import * as userController from "../controllers/usersController";
import { verifyJWT } from "../middleware/verifyJWT";

const userRoutes = express.Router();

userRoutes.use(verifyJWT);

userRoutes
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default userRoutes;
