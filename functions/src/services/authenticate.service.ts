import { HttpErrorService } from "../utils/httpError.utils"
import { admin } from "../config/firebase"
import { logger } from "firebase-functions"

export const loginService = async (email: string): Promise<any> => {
    const user = await admin.auth().getUserByEmail(email)
    if(!user){
        throw new HttpErrorService("Usuario no encontrado", 404)
    }
    return {...user}
}

export const resetPasswordService = async (email: string): Promise<string> => {
    try {
        const link = await admin.auth().generatePasswordResetLink(email)
        logger.log(`Password reset link generated: ${link}`);
        return link
    } catch (error) {
        logger.warn(error);
        throw new Error("Error interno del servicio al generar el enlace de restablecimiento de contraseña")
    }
}

export const createUserAuthAloneService = async (email: string): Promise<any> => {
    const newUser = await admin.auth().createUser({
        email,
        password: 'admin$admin!'
    })
    
    if(!newUser){
        throw new HttpErrorService("No se pudo crear el usuario", 400)
    }
    await admin.auth().setCustomUserClaims(newUser.uid, { role: 'USER' });
    return {...newUser}
}

export const createUserAuthService = async (email: string, password: string): Promise<string> => {
    const user = await admin.auth().createUser({
        email,
        password
    })
    if(!user){
        throw new HttpErrorService("No se pudo crear el usuario", 400)
    }
    await admin.auth().setCustomUserClaims(user.uid, { role: 'USER' });
    return user.uid
}

export const updateUserAuthService = async (uid: string, data: any): Promise<any> => {
    const user = await admin.auth().getUser(uid)
    if(!user){
        throw new HttpErrorService("No existe el usuario solicitado", 404)
    }
    const updatedUser = await admin.auth().updateUser(uid, {
        email: data.email || user.email,
        password: data.password || undefined,
        disabled: data.disabled !== undefined ? data.disabled : user.disabled,
    })
    if(!updatedUser){
        throw new HttpErrorService("No se pudo actualizar el usuario", 400)
    }
    await admin.auth().setCustomUserClaims(user.uid, { role: data.role || 'USER' });
    return {...updatedUser}
}   