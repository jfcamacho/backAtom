import { Router } from "express";
import { configController } from "../controllers/config.controller";

const configRoute = Router()

configRoute.get("/", configController)

export default configRoute