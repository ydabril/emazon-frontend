import { PaginationRequest } from "src/app/data/network/requests/pagination.request";
import { Brand } from "src/app/data/network/responses/brand.response";
import { Category } from "src/app/data/network/responses/category.response";

export abstract class RegisterOutputLogic {
    isNavMenuExpanded: boolean = false;
    openForm: boolean = false;
    showModalMessage!: boolean;
    modalIcon!: string;
    modalTitle!: string;
    modalMessage!: string;
    currentPage!: number;
    totalPages!: number;
    hasNextPage!: boolean;
    hasPreviousPage!: boolean;
    page: number = 0;
    paginationRequest!: PaginationRequest;
    listDataCategory!: Array<Category>;
    listDataBrand!: Array<Brand>;
    success: boolean = false;
}