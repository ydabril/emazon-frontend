import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService } from './article.service';
import { environment } from 'src/environments/environment';
import { ArticleRequest } from 'src/app/data/network/requests/articleRequest';

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
});
