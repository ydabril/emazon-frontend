export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface CategoryResponse {
    list: Category[];
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}