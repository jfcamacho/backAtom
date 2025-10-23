import { admin } from '../config/firebase';
import { HttpErrorService } from '../utils/httpError.utils';
import { ParamPaginator } from '../utils/interfaces/param-paginator.interface';
import { paginatorHandler } from '../utils/paginator.service';
import { getShoreKindByIdService } from './shoreKind.service';
import { getUserByIdService } from './user.service';

const db = admin.firestore().collection('shores');

export const getAllShoreService = async (paramPaginator: ParamPaginator) => {
    const query = await paginatorHandler(db, paramPaginator);
    const shores = await query.get();
    return shores.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export const createShoreService = async (data: any) => {
    
    await getUserByIdService(data.userId)
    await getShoreKindByIdService(data.shoreKindId)

    const createdAt = new Date();
    data.status = 'ACTIVE';
    data.createdAt = createdAt;
    data.updatedAt = createdAt;

    const shoreRef = await db.add(data);
    const newShore = await shoreRef.get();
    return { 
        message: 'Tarea asignada de forma correcta',
        id: newShore.id, ...newShore.data() 
    };
}

export const getShoreByIdService = async (id: string) => {
    const shoreDoc = await db.doc(id).get();
    if (!shoreDoc.exists) {
        throw new HttpErrorService("La tarea no ha sido encontrada", 404)
    }
    return { id: shoreDoc.id, ...shoreDoc.data() };
}

export const updateShoreService = async (id: string, data: any) => {
    const shoreDoc = await db.doc(id).get();
    if (!shoreDoc.exists) {
        throw new HttpErrorService("La tarea no ha sido encontrada", 404)
    }

    data.updatedAt = new Date();

    await db.doc(id).update({...shoreDoc.data(), ...data});
    const updatedShoreDoc = await db.doc(id).get();
    return { 
        message: 'Tarea actualizada de forma correcta',
        id: updatedShoreDoc.id, 
        ...updatedShoreDoc.data() 
    };
}