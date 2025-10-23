import { Request } from "express";
import { ParamPaginator } from "./interfaces/param-paginator.interface";

export const paginatorHandler = async (collection: any, paramPaginator: ParamPaginator) => {
    
    let query = collection as FirebaseFirestore.Query;
    
    paramPaginator.limite = Number(paramPaginator.limite) || 1000

    const lengthCampo: number = paramPaginator.campoFiltro?.length || 0
    const lengthValor: number = paramPaginator.valorFiltro?.length || 0
    
    if(lengthCampo > 0 && lengthValor > 0 && lengthCampo === lengthValor){
        for(let i = 0; i < lengthCampo; i++){
            query = query
            .where(paramPaginator.campoFiltro![i], '>=', paramPaginator.valorFiltro![i])
            .where(paramPaginator.campoFiltro![i], '<=', paramPaginator.valorFiltro![i] + '\uf8ff')
        }
    }

    if (paramPaginator.startAfterId) {
        const lastDoc = await collection.doc(paramPaginator.startAfterId).get();
        if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
        }
    }

    if(paramPaginator.campoOrden){
        query = query.orderBy(paramPaginator.campoOrden, paramPaginator.orden || 'asc');
    }

    if(paramPaginator.limite){
        query = query.limit(paramPaginator.limite)
    }

    return query

}

export const paginatorBuild = (req: Request): ParamPaginator => {
    const { campoOrden, orden, limite, startAfterId, status } = req.query;

    const campoFiltro = Array.isArray(req.query.campoFiltro)
        ? req.query.campoFiltro
        : req.query.campoFiltro
        ? [req.query.campoFiltro]
        : [];

    const valorFiltro = Array.isArray(req.query.valorFiltro)
        ? req.query.valorFiltro
        : req.query.valorFiltro
        ? [req.query.valorFiltro]
        : [];
        
    const paramPaginator: ParamPaginator = {
        campoOrden: campoOrden as string | undefined,
        orden: (orden as 'asc' | 'desc') || 'asc',
        campoFiltro: campoFiltro as string[] | undefined,
        valorFiltro: valorFiltro as string[] | undefined,
        limite: limite ? Number(limite) : undefined,
        startAfterId: startAfterId as string | undefined,
        status: status as string | undefined,
    };
    return paramPaginator;
}