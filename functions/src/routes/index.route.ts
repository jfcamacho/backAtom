import { Router } from "express";
import UserRoute from "./user.route";
import HealthRoute from "./health.route";
import authenticateRoute from "./authenticate.route";
import shoreKindRouter from "./shoreKind.route";
import shoreRouter from "./shore.route";
import configRoute from "./config.route";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use("/users", UserRoute)
router.use("/authenticate", authenticateRoute)
router.use("/shoreKind",authenticate, shoreKindRouter)
router.use("/shore",authenticate, shoreRouter)
router.use("/config",authenticate, configRoute)

router.get("/healthCheck", HealthRoute)

export default router;