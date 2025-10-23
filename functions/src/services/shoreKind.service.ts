import { Request } from "express";
import { admin } from "../config/firebase";
import { HttpErrorService } from "../utils/httpError.utils";
import { paginatorBuild, paginatorHandler } from "../utils/paginator.service";

const db = admin.firestore().collection('shoreKinds');

export const getAllShoreKindsService = async (req: Request) => {
    const paramPaginator = paginatorBuild(req);
    const query = await paginatorHandler(db, paramPaginator);
    const shoreKinds = await query.get();
    return shoreKinds.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export const getShoreKindByIdService = async (id: string) => {
    const shoreKind = await db.doc(id).get();
    if (!shoreKind.exists) {
        throw new HttpErrorService("No se ha encontrado la tarea solicitada", 404);
    }
    return { id: shoreKind.id, ...shoreKind.data() };
}

export const createShoreKindService = async (data: any) => {
    const createdAt = new Date();
    data.status = 'ACTIVE';
    data.createdAt = createdAt;
    data.updatedAt = createdAt;

    const shoreKindRef = await db.add(data);
    const newShoreKind = await shoreKindRef.get();
    return { 
        message: 'Tipo de tarea correctamente creada',
        id: newShoreKind.id, ...newShoreKind.data() 
    };
}

export const updateShoreKindService = async (id: string, data: any) => {
    const shoreKindRef = await db.doc(id).get();
    if(!shoreKindRef.exists){
        throw new HttpErrorService("No se ha encontrado la tarea solicitada", 404);
    }
    data.updatedAt = new Date();

    const newObject = { ...shoreKindRef.data(), ...data };
    await db.doc(id).update(newObject);
    const updatedShoreKind = await db.doc(id).get();
    
    return { 
        message: 'Tipo de tarea correctamente actualizada',
        id: updatedShoreKind.id, ...updatedShoreKind.data() 
    };
}