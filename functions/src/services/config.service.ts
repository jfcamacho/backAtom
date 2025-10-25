import { admin } from "../config/firebase"
import { HttpErrorService } from "../utils/httpError.utils";

const db = admin.firestore().collection('config');

export const configService = async () => {
    const config = await db.doc('Config').get()
    if(!config){
        throw new HttpErrorService('Consulta incorrecta de la configuracion', 500)
    }
    return {
        id: config.id,
        ...config.data()
    }
}