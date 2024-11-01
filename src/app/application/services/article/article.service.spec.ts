import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService } from './article.service';
import { environment } from 'src/environments/environment';
import { ArticleRequest } from 'src/app/data/network/requests/articleRequest';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { ArticleResponse } from 'src/app/data/network/responses/article.response';
import { HttpResponse } from '@angular/common/http';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService]
    });

    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the correct API endpoint to create an article', () => {
    const articleRequest: ArticleRequest = {
      name: 'New Article',
      description: 'A sample article',
      price: 100,
      quantity: 10,
      categoryIds: [1, 2],
      brandId: 3
    };

    service.createArticle(articleRequest).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.API_URL}/article`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(articleRequest);
    req.flush({});
  });

  it('should call the correct API endpoint to get articles with pagination', () => {
    const paginationRequest: PaginationRequest = {
      size: 10,
      sortDirection: 'ASC'
    };
    const page = 1;
    const sortByValue = 'name';
    const mockResponse: ArticleResponse = {
      list: [
        { 
          name: 'Test Article',
          price: 50, 
          quantity: 5, 
          categories: [{
            id: 1,
            name: 'name',
            description: 'description'
          }], 
          brand: {
            id: 1,
            name: 'name',
            description: 'description'
          }

        }],
        currentPage: 0,
        pageSize: 10,
        totalElements: 10,
        totalPages: 1,
        hasNextPage: true,
        hasPreviousPage: true
    };

    service.getArticles(paginationRequest, page, sortByValue).subscribe((response) => {
      expect(response.body).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/article?sortBy=name&sortDirection=ASC&page=1&size=10`);
    expect(req.request.method).toBe('GET');
    req.flush(new HttpResponse({ body: mockResponse }));
  });

  it('should handle error when getArticles fails', () => {
    const paginationRequest: PaginationRequest = {
      size: 10,
      sortDirection: 'ASC'
    };
    const page = 1;
    const sortByValue = 'name';
    const errorMessage = 'Failed to fetch articles';

    service.getArticles(paginationRequest, page, sortByValue).subscribe(
      () => fail('Expected an error, not articles'),
      (error) => expect(error.message).toContain(errorMessage)
    );

    const req = httpMock.expectOne(`${environment.API_URL}/article?sortBy=name&sortDirection=ASC&page=1&size=10`);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});