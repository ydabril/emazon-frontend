import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CartRequest } from "src/app/data/network/requests/cart.request";
import { ICartService } from "src/app/domain/interfaces/cart.interface";
import { environment } from "src/environments/environment";


@Injectable()
export class CartService implements ICartService {
  constructor(private _http: HttpClient) { }

  public addArticle(cartRequest: CartRequest) {
    return this._http.post<unknown>(`${environment.API_URL_CART}/cart/add-article`, cartRequest, { observe: 'response' });
  }
}