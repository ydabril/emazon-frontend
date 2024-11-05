import { IColumnsCategory } from "src/app/domain/interfaces/column-category.interface";

export const ArticleColumns: Array<IColumnsCategory> = [
    { header: 'id', field: 'id' },
    { header: 'Nombre', field: 'name' },
    { header: 'cantidad', field: 'quantity' },
    { header: 'accion', field: 'action' }
];