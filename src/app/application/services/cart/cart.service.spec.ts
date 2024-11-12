import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { CartRequest } from 'src/app/data/network/requests/cart.request';
import { environment } from 'src/environments/environment';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { ArticleCartResponse } from 'src/app/data/network/responses/article-cart.response';

describe('CartService', () => {
    let service: CartService;
    let httpMock: HttpTestingController;
  
    const mockCartRequest: CartRequest = {
      articleId: 1,
      quantity: 2
    };
  
    const mockPaginationRequest: PaginationRequest = {
      size: 10,
      sortDirection: 'asc'
    };
  
    const mockArticleCartResponse: ArticleCartResponse = { list: [], totalElements: 10, pageSize: 10, totalPages: 1, totalPrice: 1000, currentPage: 0, hasNextPage: false, hasPreviousPage: false };
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [CartService]
      });
  
      service = TestBed.inject(CartService);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    afterEach(() => {
      httpMock.verify();
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  
    it('should make a POST request to add an article to the cart', () => {
      const mockResponse = { message: 'Article added to cart successfully' };
  
      service.addArticle(mockCartRequest).subscribe((response) => {
        expect(response.body).toEqual(mockResponse);
      });
  
      const req = httpMock.expectOne(`${environment.API_URL_CART}/cart/add-article`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockCartRequest);
  
      req.flush(mockResponse);
    });
  
    it('should make a GET request to get articles in the cart with pagination', () => {
      const page = 1;
      const categoryValue = 'Electronics';
      const brandValue = 'BrandA';
  
      service.getArticlesCart(mockPaginationRequest, page, categoryValue, brandValue).subscribe((response) => {
        expect(response.body).toEqual(mockArticleCartResponse);
      });
  
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('size', mockPaginationRequest.size.toString());
      params.append('sortDirection', mockPaginationRequest.sortDirection);
      params.append('categoryName', categoryValue);
      params.append('brandName', brandValue);
  
      const expectedUrl = `${environment.API_URL_CART}/cart/list-articles?${params.toString()}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
  
      req.flush(mockArticleCartResponse);
    });
  
    it('should make a DELETE request to delete an article from the cart', () => {
      const articleId = 1;
      const mockResponse = { message: 'Article deleted successfully' };
  
      service.deleteArticleCart(articleId).subscribe((response) => {
        expect(response.body).toEqual(mockResponse);
      });
  
      const req = httpMock.expectOne(`${environment.API_URL_CART}/cart/delete-article/${articleId}`);
      expect(req.request.method).toBe('DELETE');
  
      req.flush(mockResponse);
    });
  });
  