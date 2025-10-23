import { Request, Response } from "express"
import { createUserAuthAloneService, createUserAuthService, loginService, resetPasswordService, updateUserAuthService } from "../services/authenticate.service"
import { manageErrorResponse } from "../utils/httpError.utils"

export const loginController = async (req: Request, res: Response) => {
    try {
        const {email} = req.body
        const user = await loginService(email)
        res.status(200).json(user)
    } catch (error: any) {
        manageErrorResponse(error, res);
    }
}

export const createUserAuthAloneController = async (req: Request, res: Response) => {
    try {
        const {email} = req.body
        const user = await createUserAuthAloneService(email)
        res.status(200).json(user)
    } catch (error: any) {
        manageErrorResponse(error, res);
    }
}

export const createUserAuthController = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
        const user = await createUserAuthService(email, password)
        res.status(200).json(user)
    } catch (error) {
        manageErrorResponse(error, res);
    }
}

export const updateUserAuthController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await updateUserAuthService(id, req.body)
        res.status(200).json(user)
    } catch (error) {
        manageErrorResponse(error, res);
    }
}

export const resetPasswordController = async (req: Request, res: Response) => {
    try {
        const {email} = req.body
        const link = await resetPasswordService(email)
        res.status(200).json(link)
    } catch (error) {
        manageErrorResponse(error, res);
    }
}