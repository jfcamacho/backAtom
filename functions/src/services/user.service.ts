import { admin } from "../config/firebase";
import { HttpErrorService } from "../utils/httpError.utils";
import { logger } from "firebase-functions";
import { createUserAuthAloneService, createUserAuthService } from "./authenticate.service";
import { paginatorBuild, paginatorHandler } from "../utils/paginator.service";
import { Request } from "express";

const db = admin.firestore().collection("users");

export const getAllUsersService = async (req: Request) => {
  const paramPaginator = paginatorBuild(req);
  const query = await paginatorHandler(db, paramPaginator);
  const users = await query.get();
  const listUsers = users.docs.map( doc => ({id: doc.id, ...doc.data()}))

  return listUsers
}

export const getUserByIdService = async (id: string) => {
  try {
    const user = await db.doc(id).get();

    if(!user.exists){
      throw new HttpErrorService("Usuario no encontrado", 404)
    }

    return {id: user.id, ...user.data()}

  } catch (error: any) {

    throw new  Error(error?.message || "Error interno del servicio al consultar el usuario")
      
  }
}

export const createUserService = async (data: any) => {
  const createAt = new Date();
  data.status = 'ACTIVE';
  data.createdAt = createAt;
  data.updatedAt = createAt;

  let createdUser: any;

  try {
    createdUser = await createUserAuthService(data.email, data.password)

    const uid = createdUser.uid;

    data.role = data.role || 'USER';
    delete data.password;

    await admin.firestore().runTransaction(async (transaction) => {
      const userRef = db.doc(uid);
      transaction.set(userRef, {
        ...data,
        uid: uid,
      });
    })

    return {
      message: 'Usuario creado exitosamente',
      uid: createdUser.uid,
      email: createdUser.email
    }
  } catch (error) {
    logger.warn(error);
    if(error instanceof HttpErrorService){
      throw error
    }
    if(createdUser){
      try {
        await admin.auth().deleteUser(createdUser.uid);
        logger.warn(`Usuario ${createdUser.uid} eliminado (rollback ejecutado).`);
      } catch (rollbackError) {
        logger.error('Error al hacer rollback:', rollbackError);
      }
    }
    throw new  Error("Error interno del servicio al crear el usuario")
  }
}

export const createUserAloneService = async (data: any) => {
  const createAt = new Date();
  data.status = 'ACTIVE';
  data.name = 'Nuevo usuario'
  data.createdAt = createAt;
  data.updatedAt = createAt;

  let createdUser: any;

  try {
    createdUser = await createUserAuthAloneService(data.email)

    const uid = createdUser.uid;
    data.role = data.role || 'USER';

    await admin.firestore().runTransaction(async (transaction) => {
      const userRef = db.doc(uid);
      transaction.set(userRef, {
        ...data,
        uid: uid,
      });
    })

    return {
      message: 'Usuario creado exitosamente',
      uid: createdUser.uid,
      email: createdUser.email
    }
  } catch (error) {
    logger.warn(error);
    if(error instanceof HttpErrorService){
      throw error
    }
    if(createdUser){
      try {
        await admin.auth().deleteUser(createdUser.uid);
        logger.warn(`Usuario ${createdUser.uid} eliminado (rollback ejecutado).`);
      } catch (rollbackError) {
        logger.error('Error al hacer rollback:', rollbackError);
      }
    }
    throw new  Error("Error interno del servicio al crear el usuario")
  }
}

export const updateUserService = async (id: string, data: any) => {
  try {
    const user = await db.doc(id).get();

    if(!user.exists){
      throw new  Error("Usuario no encontrado")
    }

    admin.auth().updateUser(id, {
      email: data.email,
      displayName: `${data.firstName} ${data.lastName}`,
    });

    data.updatedAt = new Date();
    
    const newObject = { ...user.data(), ...data };

    await db.doc(id).update({...newObject});

    return {
      message: 'Usuario actualizado exitosamente',
      id,
      ...newObject
    }

  } catch (error: any) {
    throw new  Error(error?.message || "Error interno al actualizar el usuario")
  }
}
