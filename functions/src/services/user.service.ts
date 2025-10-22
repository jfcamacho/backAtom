import { admin } from "../config/firebase";

const db = admin.firestore();

export const getAllUsersService = async () => {
  try {
    const users = await db.collection("users").where("status", "==", "ACTIVE").get();
    const listUsers = users.docs.map( doc => ({id: doc.id, ...doc.data()}))

    return listUsers

  } catch (error) {

    throw new  Error("Error interno del servicio al consultar los usuarios")
      
  }
}

export const getUserByIdService = async (id: string) => {
  try {
    const user = await db.collection("users").doc(id).get();

    if(!user.exists){
      throw new  Error("Usuario no encontrado")
    }

    return {id: user.id, ...user.data()}

  } catch (error: any) {

    throw new  Error(error?.message || "Error interno del servicio al consultar el usuario")
      
  }
}

export const createUserService = async (data: any) => {
  try {
    const createAt = new Date();
    data.status = 'ACTIVE';
    data.createdAt = createAt;
    data.updatedAt = createAt;

    const newUser = await db.collection("users").add(data);
    return {id: newUser.id, ...data}
  } catch (error) {
    throw new  Error("Error interno del servicio al crear el usuario")
  }
}

export const updateUserService = async (id: string, data: any) => {
  try {
    const user = await db.collection('users').doc(id).get();

    if(!user.exists){
      throw new  Error("Usuario no encontrado")
    }

    data.updatedAt = new Date();
    
    const newObject = { ...user.data(), ...data };

    await db.collection('users').doc(id).update({...newObject});

    return {id, ...newObject}

  } catch (error: any) {
    throw new  Error(error?.message || "Error interno al actualizar el usuario")
  }
}
