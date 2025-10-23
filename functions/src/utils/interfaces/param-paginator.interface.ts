export interface ParamPaginator {
    campoOrden?: string,
    orden?: 'asc' | 'desc',
    campoFiltro?: string[],
    valorFiltro?: string[],
    limite?: number,
    startAfterId?: string,
    status?: string,
}