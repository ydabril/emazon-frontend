import { Observable } from "rxjs";
import { SaleRequest } from "src/app/data/network/requests/sale.request";

export interface ITransactionService {
    addSale(categoryRequest: SaleRequest): Observable<any>
}