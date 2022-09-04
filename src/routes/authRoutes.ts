import express from "express";
import { loginLimiter } from "../middleware/loginLimiter";
import * as authController from "../controllers/authController";

const authRoutes = express.Router();

authRoutes.route("/").post(loginLimiter, authController.login);
authRoutes.route("/refresh").get(authController.refresh);
authRoutes.route("/logout").post(authController.logout);

export default authRoutes;
