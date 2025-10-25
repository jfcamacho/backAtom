import { Request, Response } from "express";
import { manageErrorResponse } from "../utils/httpError.utils";
import { configService } from "../services/config.service";

export const configController = async (req: Request, res: Response) => {
    try {
        const config = await configService()
        res.status(200).json(config)
    } catch (error) {
        manageErrorResponse(error, res)
    }
}