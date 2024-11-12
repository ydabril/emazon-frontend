import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { CartRequest } from 'src/app/data/network/requests/cart.request';
import { environment } from 'src/environments/environment';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  const mockCartRequest: CartRequest = {
    articleId: 1,
    quantity: 2
  };

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
});
