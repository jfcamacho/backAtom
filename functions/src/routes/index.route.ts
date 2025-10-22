import { Router } from "express";
import UserRoute from "./user.route";
import HealthRoute from "./health.route";

const router = Router();

router.use("/users", UserRoute)

router.get("/healthCheck", HealthRoute)

export default router;