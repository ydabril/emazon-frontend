import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { CategpryRequest } from 'src/app/data/network/requests/category.request';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { CategoryResponse } from 'src/app/data/network/responses/category.response';
import { CategoryService } from 'src/app/application/services/category.service';

describe('CategoryService', () => {
    let service: CategoryService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CategoryService]
        });

        service = TestBed.inject(CategoryService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create a category', () => {
        const categoryRequest: CategpryRequest = { name: 'New Category', description: 'Category Description' };

        service.createCategory(categoryRequest).subscribe(response => {
            expect(response).toBeTruthy();
            expect(response.status).toBe(200);
        });

        const req = httpTestingController.expectOne(`${environment.API_URL}/category`);
        expect(req.request.method).toBe('POST');
        req.flush({}, { status: 200, statusText: 'OK' });
    });

    it('should get categories', () => {
        const paginationRequest: PaginationRequest = { size: 10, sortDirection: 'ASC' };
        const mockResponse: CategoryResponse = {
            totalPages: 2,
            currentPage: 1,
            pageSize: 10,
            totalElements: 10,
            hasNextPage: true,
            hasPreviousPage: false,
            list: [{ id: 1, name: 'Category 1', description: 'descripcion' }]
        };

        service.getCategories(paginationRequest, 0).subscribe(response => {
            expect(response.body).toEqual(mockResponse);
            expect(response.status).toBe(200);
        });

        const req = httpTestingController.expectOne(`${environment.API_URL}/category?page=0&size=10&sortDirection=ASC`);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse, { status: 200, statusText: 'OK' });
    });
});
