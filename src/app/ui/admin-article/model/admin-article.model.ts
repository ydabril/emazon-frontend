import { ArticleColumns } from "src/app/core/constants/article-columns";
import { PaginationRequest } from "src/app/data/network/requests/pagination.request";
import { Article } from "src/app/data/network/responses/article.response";
import { Brand } from "src/app/data/network/responses/brand.response";
import { Category } from "src/app/data/network/responses/category.response";
import { IColumnsCategory } from "src/app/domain/interfaces/column-category.interface";

export abstract class AdminArticleOutputLogic {
    isNavMenuExpanded: boolean = false;
    openForm: boolean = false;
    openFormSupply: boolean = false;
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
    listDataArticle!: Array<Article>;
    sortBy: string = 'ARTICLE_NAME';
    articleColumns: Array<IColumnsCategory> = ArticleColumns;
    articleId!: number;
}