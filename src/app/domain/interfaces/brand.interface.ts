import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { BrandRequest } from "src/app/data/network/requests/brandRequest";
import { PaginationRequest } from "src/app/data/network/requests/pagination.request";
import { CategoryResponse } from "src/app/data/network/responses/category.response";

export interface IBrandService {
    createBrand(brandRequest: BrandRequest): Observable<any>
    getBrands(paginationRequest: PaginationRequest, page: number): Observable<HttpResponse<CategoryResponse>> 
}