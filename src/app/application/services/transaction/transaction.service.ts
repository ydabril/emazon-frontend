import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SaleRequest } from "src/app/data/network/requests/sale.request";
import { ITransactionService } from "src/app/domain/interfaces/transaction.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class TransactionService implements  ITransactionService {
  constructor(private _http: HttpClient) { }

  public addSale(saleRequest: SaleRequest) {
    return this._http.post<unknown>(`${environment.API_URL_TRANSACTION}/transaction/sale`, saleRequest, { observe: 'response' });
  }
}