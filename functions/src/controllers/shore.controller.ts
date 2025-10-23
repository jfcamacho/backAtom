import { Request, Response } from "express";
import { paginatorBuild } from "../utils/paginator.service";
import { createShoreService, getAllShoreService, getShoreByIdService, updateShoreService } from "../services/shore.service";
import { manageErrorResponse } from "../utils/httpError.utils";

export const getAllShoresController = async (req: Request, res: Response) => {
    try {
        const paramPaginator = paginatorBuild(req);
        const shores = await getAllShoreService(paramPaginator);
        res.status(200).json({ shores });
    } catch (error: any) {
        manageErrorResponse(error, res);
    }
}   

export const createShoresController = async (req: Request, res: Response) => {
    try {
        const shores = await createShoreService(req.body);
        res.status(200).json(shores);
    } catch (error: any) {
        manageErrorResponse(error, res);
    }
}   

export const getShoreByIdController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const shore = await getShoreByIdService(id);
        res.status(200).json(shore);
    }   catch (error: any) {
        manageErrorResponse(error, res);
    }
}

export const updateShoreController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const shore = await updateShoreService(id, req.body);
        res.status(200).json(shore);
    }   catch (error: any) {
        manageErrorResponse(error, res);
    }
}  

export const deleteShoreController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const shore = await updateShoreService(id, {status: 'INACTIVE'});
        res.status(200).json(shore);
    }   catch (error: any) {
        manageErrorResponse(error, res);
    }
}  