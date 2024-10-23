import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BrandRequest } from "src/app/data/network/requests/brandRequest";
import { PaginationRequest } from "src/app/data/network/requests/pagination.request";
import { BrandResponse } from "src/app/data/network/responses/brand.response";
import { CategoryResponse } from "src/app/data/network/responses/category.response";
import { IBrandService } from "src/app/domain/interfaces/brand.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class BrandService implements IBrandService {
    constructor(private _http: HttpClient) { }

    public createBrand(brandRequest: BrandRequest) {
        return this._http.post<any>(`${environment.API_URL}/brand`, brandRequest, { observe: 'response' });
    }

    public getBrands(paginationRequest: PaginationRequest, page: number): Observable<HttpResponse<BrandResponse>> {
        const size =paginationRequest.size;
        const sortDirection = paginationRequest.sortDirection;

        const url = `${environment.API_URL}/brand?page=${page}&size=${size}&sortDirection=${sortDirection}`;

        return this._http.get<CategoryResponse>(url, { observe: 'response' });
    }
}