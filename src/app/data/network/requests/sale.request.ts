export interface ArticleSale {
    articleId: number,
    articleName: string,
    quantity: number
}

export interface SaleRequest {
    articles: ArticleSale[],
    cartIds: number[],
    totalPrice: number,
    userId: number,
    email: string
}