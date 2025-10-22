import { Request, Response } from 'express';
import { createUserService, getAllUsersService, getUserByIdService, updateUserService } from '../services/user.service';

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const listUsers = await getAllUsersService()
        res.status(200).json({users: listUsers})
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
}

export const getUserByIdController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const user = await getUserByIdService(id)
        res.status(200).json({user})
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
}

export const createUserController = async (req: Request, res: Response) => {
    try {
        const newUser = await createUserService(req.body)
        res.status(201).json({user: newUser})
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
}

export const updateUserController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const newUser = await updateUserService(id, req.body)
        res.status(200).json({user: newUser})
    } catch (error: any) {
        res.status(error.code || 500).json({error: error.message})
    }
}

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        await updateUserService(id, {status: 'INACTIVE'})
        res.status(200).json({message: `Usuario con id: ${id} correctamente eliminado`})
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
}