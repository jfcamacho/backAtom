import { Router } from "express"
import { createUserController, deleteUserController, getAllUsersController, getUserByIdController, updateUserController } from "../controllers/user.controller"

const UserRoute = Router()

UserRoute.get("/", getAllUsersController)
UserRoute.get("/:id", getUserByIdController)
UserRoute.post("/", createUserController)
UserRoute.put("/:id", updateUserController)
UserRoute.delete("/:id", deleteUserController)

export default UserRoute