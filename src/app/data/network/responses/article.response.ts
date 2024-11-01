import { Brand } from "./brand.response";
import { Category } from "./category.response";

export interface Article {
    name: string,
    price: number,
    quantity: number,
    brand: Brand,
    categories: Category[]
}

export interface ArticleResponse {
    list: Article[];
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}