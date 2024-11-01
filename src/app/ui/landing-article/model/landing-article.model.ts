import { PaginationRequest } from "src/app/data/network/requests/pagination.request";
import { Article } from "src/app/data/network/responses/article.response";
import { Brand } from "src/app/data/network/responses/brand.response";
import { Category } from "src/app/data/network/responses/category.response";

export abstract class LandingArticleOutputLogic {
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
    listDataArticle!: Array<Article>;
    listDataBrand!: Array<Brand>;
    sortBy: string = 'ARTICLE_NAME';
}