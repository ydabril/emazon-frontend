import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { CategpryRequest } from "src/app/data/network/requests/category.request";
import { PaginationRequest } from "src/app/data/network/requests/pagination.request";
import { CategoryResponse } from "src/app/data/network/responses/category.response";

export interface ICategoryService {
    createCategory(categoryRequest: CategpryRequest): Observable<any>
    getCategories(paginationRequest: PaginationRequest, page: number): Observable<HttpResponse<CategoryResponse>> 
}