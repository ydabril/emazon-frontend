import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { BrandRequest } from 'src/app/data/network/requests/brandRequest';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { BrandResponse } from 'src/app/data/network/responses/brand.response';
import { BrandService } from 'src/app/application/services/brand.service';

describe('BrandService', () => {
  let service: BrandService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService]
    });

    service = TestBed.inject(BrandService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a brand', () => {
    const brandRequest: BrandRequest = { name: 'New Brand', description: 'Brand Description' };

    service.createBrand(brandRequest).subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/brand`);
    expect(req.request.method).toBe('POST');
    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should get brands', () => {
    const paginationRequest: PaginationRequest = { size: 10, sortDirection: 'ASC' };
    const mockResponse: BrandResponse = {
      totalPages: 2,
      currentPage: 1,
      pageSize: 10,
      totalElements: 10,
      hasNextPage: true,
      hasPreviousPage: false,
      list: [{ id: 1, name: 'Brand 1', description: 'description' }],
    };

    service.getBrands(paginationRequest, 0).subscribe(response => {
      expect(response.body).toEqual(mockResponse);
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.API_URL}/brand?page=0&size=10&sortDirection=ASC`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse, { status: 200, statusText: 'OK' });
  });
});
