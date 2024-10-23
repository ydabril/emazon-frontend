import { categoryColumns } from 'src/app/core/constants/categorry-columns';
import { CorePresenter } from 'src/app/core/views/core.presenter';
import { BrandRequest } from 'src/app/data/network/requests/brandRequest';
import { CategpryRequest } from 'src/app/data/network/requests/category.request';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { Category } from 'src/app/data/network/responses/category.response';
import { IColumnsCategory } from 'src/app/domain/interfaces/column-category.interface';

export abstract class AdminBrandOutputLogic {
    isNavMenuExpanded: boolean = false;
    tableDataBrand!: Array<Category>;
    brandColumns: Array<IColumnsCategory> = categoryColumns;
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
}

export interface AdminBrandInputLogic extends CorePresenter {
    createBrand(brandRequest: BrandRequest): void
    getBrands(paginationRequest: PaginationRequest, page: number): void;
}

