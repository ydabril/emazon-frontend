import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ICategoryService } from "src/app/domain/interfaces/category.interface";
import { CategpryRequest } from "src/app/data/network/requests/category.request";
import { Observable } from "rxjs";
import { CategoryResponse } from "src/app/data/network/responses/category.response";
import { PaginationRequest } from "src/app/data/network/requests/pagination.request";


@Injectable()
export class CategoryService implements ICategoryService {
    constructor(private _http: HttpClient) { }

    public createCategory(categortRequest: CategpryRequest) {
        return this._http.post<any>(`${environment.API_URL}/category`, categortRequest, { observe: 'response' });
    }

    public getCategories(paginationRequest: PaginationRequest, page: number): Observable<HttpResponse<CategoryResponse>> {
        const size =paginationRequest.size;
        const sortDirection = paginationRequest.sortDirection;

        const url = `${environment.API_URL}/category?page=${page}&size=${size}&sortDirection=${sortDirection}`;

        return this._http.get<CategoryResponse>(url, { observe: 'response' });
    }
}