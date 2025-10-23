import { Request, Response } from "express";
import { createShoreKindService, getAllShoreKindsService, getShoreKindByIdService, updateShoreKindService } from "../services/shoreKind.service";
import { manageErrorResponse } from "../utils/httpError.utils";

export const getAllShoreKindsController = async (req: Request, res: Response) => {
    try {
        const shoreKinds = await getAllShoreKindsService(req);
        res.status(200).json({ shoreKinds });
    } catch (error: any) {
        manageErrorResponse(error, res);
    }
}

export const getShoreKindByIdController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const shoreKind = await getShoreKindByIdService(id);
        res.status(200).json( shoreKind );
    } catch (error: any) {
        manageErrorResponse(error, res);
    }
}

export const createShoreKindController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const newShoreKind = await createShoreKindService(data);
        res.status(201).json(newShoreKind);
    } catch (error: any) {
        manageErrorResponse(error, res);
    }
}

export const updateShoreKindController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedShoreKind = await updateShoreKindService(id, data);
        res.status(200).json(updatedShoreKind);
    } catch (error: any) {
        manageErrorResponse(error, res);
    }
}

export const deleteShoreKindController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedShoreKind = await updateShoreKindService(id, { status: 'INACTIVE',});
        res.status(200).json(updatedShoreKind);
    } catch (error: any) {
        manageErrorResponse(error, res);
    }
}