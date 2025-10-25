import { Router } from "express"
import { createUserAloneController, createUserController, deleteUserController, getAllUsersController, getUserByIdController, updateUserController } from "../controllers/user.controller"
import { authenticate } from "../middleware/auth.middleware"

const UserRoute = Router()

UserRoute.get("/",authenticate, getAllUsersController)
UserRoute.get("/:id",authenticate, getUserByIdController)
UserRoute.post("/",authenticate, createUserController)
UserRoute.post("/createAlone", createUserAloneController)
UserRoute.put("/:id",authenticate, updateUserController)
UserRoute.delete("/:id",authenticate, deleteUserController)

export default UserRoute