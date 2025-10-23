import { Router } from "express";
import * as authenticateController from "../controllers/authenticate.controller";

const authenticateRoute = Router()

authenticateRoute.post("/login", authenticateController.loginController)
authenticateRoute.post("/create", authenticateController.createUserAuthController)
authenticateRoute.post("/createUserAlone", authenticateController.createUserAuthAloneController)
authenticateRoute.post("/resetPassword", authenticateController.resetPasswordController)
authenticateRoute.post("/updateUser", authenticateController.updateUserAuthController)

export default authenticateRoute