import { Router } from "express";
import * as shoreController from "../controllers/shore.controller";

const shoreRouter = Router()

shoreRouter.get("/", shoreController.getAllShoresController)
shoreRouter.get("/:id", shoreController.getShoreByIdController)
shoreRouter.post("/", shoreController.createShoresController)
shoreRouter.put("/:id", shoreController.updateShoreController)
shoreRouter.delete("/:id", shoreController.deleteShoreController)

export default shoreRouter;