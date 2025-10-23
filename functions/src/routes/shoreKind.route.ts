import { Router } from "express";
import { createShoreKindController, deleteShoreKindController, getAllShoreKindsController, getShoreKindByIdController, updateShoreKindController } from "../controllers/shoreKind.controller";

const shoreKindRouter = Router()

shoreKindRouter.get("/", getAllShoreKindsController)
shoreKindRouter.get("/:id", getShoreKindByIdController)
shoreKindRouter.post("/", createShoreKindController)
shoreKindRouter.put("/:id", updateShoreKindController)
shoreKindRouter.delete("/:id", deleteShoreKindController)

export default shoreKindRouter;