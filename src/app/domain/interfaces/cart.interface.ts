import { Observable } from "rxjs";
import { CartRequest } from "src/app/data/network/requests/cart.request";

export interface ICartService {
    addArticle(categoryRequest: CartRequest): Observable<any>
}