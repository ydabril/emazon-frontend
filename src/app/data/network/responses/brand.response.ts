export interface Brand {
    id: number;
    name: string;
    description: string;
}

export interface BrandResponse {
    list: Brand[];
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}