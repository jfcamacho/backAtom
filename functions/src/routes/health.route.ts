import { Request, Response, Router } from "express";

const HealthRoute = Router();

HealthRoute.get("/", (req: Request, res: Response) => {
    res.status(200).json({status: 'Healthy'})
})

export default HealthRoute;