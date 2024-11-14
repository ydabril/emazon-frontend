import { Brand } from "./brand.response";
import { Category } from "./category.response";

export interface ArticleCart {
    id: number
    name: string,
    description: string;
    price: number,
    quantity: number,
    stock: number
    cartId: number,
    brand: Brand,
    categories: Category[],
    restockNextDate: null | string
}

export interface ArticleCartResponse {
    list: ArticleCart[];
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalPrice: number;
}