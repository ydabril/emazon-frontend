import { IColumnsCategory } from "src/app/domain/interfaces/column-category.interface";

export const ReportColumns: Array<IColumnsCategory> = [
    { header: 'correo de cliente', field: 'email' },
    { header: 'articulos', field: 'articleNames' },
    { header: 'valor total', field: 'totalPrice' },
    { header: 'fecha de compra', field: 'saleDate' }
];