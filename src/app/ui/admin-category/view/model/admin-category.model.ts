import { categoryColumns } from 'src/app/core/constants/categorry-columns';
import { CorePresenter } from 'src/app/core/views/core.presenter';
import { CategpryRequest } from 'src/app/data/network/requests/category.request';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { Category } from 'src/app/data/network/responses/category.response';
import { IColumnsCategory } from 'src/app/domain/interfaces/column-category.interface';

export abstract class AdminCategoryOutputLogic {
    isNavMenuExpanded: boolean = false;
    tableDataCategory!: Array<Category>;
    categoryColumns: Array<IColumnsCategory> = categoryColumns;
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

export interface AdminCategoryInputLogic extends CorePresenter {
    createCategory(categoryRequest: CategpryRequest): void
    getCategories(paginationRequest: PaginationRequest, page: number): void;
}

