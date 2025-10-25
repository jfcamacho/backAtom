import { Request, Response } from 'express';
import { createUserAloneService, createUserService, getAllUsersService, getUserByIdService, updateUserService } from '../services/user.service';
import { manageErrorResponse } from '../utils/httpError.utils';

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const listUsers = await getAllUsersService(req)
        res.status(200).json({users: listUsers})
    } catch (error: any) {
        manageErrorResponse(error, res);
    }
}

export const getUserByIdController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const user = await getUserByIdService(id)
        res.status(200).json(user)
    } catch (error: any) {
        manageErrorResponse(error, res);
    }
}

export const createUserController = async (req: Request, res: Response) => {
    try {
        const newUser = await createUserService(req.body)
        res.status(201).json(newUser)
    } catch (error: any) {
        manageErrorResponse(error, res);
    }
}

export const createUserAloneController = async (req: Request, res: Response) => {
    try {
        const newUser = await createUserAloneService(req.body)
        res.status(201).json(newUser)
    } catch (error: any) {
        manageErrorResponse(error, res);
    }
}


export const updateUserController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const newUser = await updateUserService(id, req.body)
        res.status(200).json(newUser)
    } catch (error: any) {
        manageErrorResponse(error, res);
    }
}

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        await updateUserService(id, {status: 'INACTIVA'})
        res.status(200).json({message: `Usuario con id: ${id} correctamente eliminado`})
    } catch (error: any) {
        manageErrorResponse(error, res);
    }
}