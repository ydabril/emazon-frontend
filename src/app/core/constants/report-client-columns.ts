import { IColumnsCategory } from "src/app/domain/interfaces/column-category.interface";

export const ReportClientColumns: Array<IColumnsCategory> = [
    { header: 'Articulos comprados', field: 'articleNames' },
    { header: 'Valor total', field: 'totalPrice' },
    { header: 'Fecha de compra', field: 'saleDate' }
];