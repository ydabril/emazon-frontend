import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService } from './article.service';
import { environment } from 'src/environments/environment';
import { ArticleRequest } from 'src/app/data/network/requests/articleRequest';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { Article, ArticleResponse } from 'src/app/data/network/responses/article.response';
import { HttpResponse } from '@angular/common/http';
import { SupplyRequest } from 'src/app/data/network/requests/supply.request';

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

    const formData = new FormData();
    formData.append('articleData', new Blob([JSON.stringify(articleRequest)], { type: 'application/json' }));

    service.createArticle(formData).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.API_URL}/article`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(formData);
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
          id: 1,
          name: 'Test Article',
          price: 50,
          quantity: 5,
          categories: [
            { id: 1, name: 'Category Name', description: 'Category Description' }
          ],
          brand: { id: 1, name: 'Brand Name', description: 'Brand Description' }
        } as Article
      ],
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

    const req = httpMock.expectOne(`${environment.API_URL}/article/all?sortBy=name&sortDirection=ASC&page=1&size=10`);
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

    const req = httpMock.expectOne(`${environment.API_URL}/article/all?sortBy=name&sortDirection=ASC&page=1&size=10`);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  it('should call the correct API endpoint to get article by ID', () => {
    const articleId = 1;
    const mockArticle: Article = {
      id: articleId,
      name: 'Article Name',
      description: 'Article Description',
      price: 100,
      quantity: 10,
      categories: [],
      brand: { id: 1, name: 'Brand Name', description: 'Brand Description' },
      imagePath: 'image-url'
    };

    service.getArticleByid(articleId).subscribe((response) => {
      expect(response.body).toEqual(mockArticle);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/article/${articleId}`);
    expect(req.request.method).toBe('GET');
    req.flush(new HttpResponse({ body: mockArticle }));
  });

  it('should call the correct API endpoint to add supply', () => {
    const supplyRequest: SupplyRequest = {
      articleId: 1,
      quantity: 50
    };

    service.addSupply(supplyRequest).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.API_URL_TRANSACTION}/transaction/add-supplies`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(supplyRequest);
    req.flush({});
  });
});
