export const validatioShoreStatusService = (lastStatus: string, newStatus: string): Promise<{response: boolean, message: string}> => {
    return new Promise((resolve) => {
        if(lastStatus === 'BLOQUEADA' && newStatus === 'ACTIVA'){
            resolve({response: true, message: ''})
        }else if(lastStatus === 'BLOQUEADA' && newStatus === 'COMPLETA'){
            resolve({response: false, message: 'No se puede completar una tarea bloqueada'})
        }else if(lastStatus === 'COMPLETA'){
            resolve({response: false, message: 'No se puede modificar una tarea completada'})
        }else if(lastStatus === 'ACTIVA'){
            resolve({response: true, message: ''})
        }else {
            resolve({response: false, message: 'No se puede modificar una tarea bloqueada o eliminada'})
        }

    })
}