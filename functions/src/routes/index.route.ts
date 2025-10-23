import { Router } from "express";
import UserRoute from "./user.route";
import HealthRoute from "./health.route";
import authenticateRoute from "./authenticate.route";
import shoreKindRouter from "./shoreKind.route";
import shoreRouter from "./shore.route";

const router = Router();

router.use("/users", UserRoute)
router.use("/authenticate", authenticateRoute)
router.use("/shoreKind", shoreKindRouter)
router.use("/shore", shoreRouter)

router.get("/healthCheck", HealthRoute)

export default router;