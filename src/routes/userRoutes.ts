import express from "express";
import * as userController from "../controllers/usersController";

const userRoutes = express.Router();

userRoutes
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default userRoutes;
