import { Router } from "express"
import { createUserAloneController, createUserController, deleteUserController, getAllUsersController, getUserByIdController, updateUserController } from "../controllers/user.controller"

const UserRoute = Router()

UserRoute.get("/", getAllUsersController)
UserRoute.get("/:id", getUserByIdController)
UserRoute.post("/", createUserController)
UserRoute.post("/createAlone", createUserAloneController)
UserRoute.put("/:id", updateUserController)
UserRoute.delete("/:id", deleteUserController)

export default UserRoute