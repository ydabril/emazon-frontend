import { TestBed } from '@angular/core/testing';
import { IBrandService } from 'src/app/domain/interfaces/brand.interface';
import { of, throwError } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { BrandRequest } from 'src/app/data/network/requests/brandRequest';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { BrandResponse } from 'src/app/data/network/responses/brand.response';
import { AdminBrandPresenter } from 'src/app/ui/admin-brand/presenter/admin-brand.presenter';
import { AdminBrandOutputLogic } from 'src/app/ui/admin-brand/view/model/admin-brand.model';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';

describe('AdminBrandPresenter', () => {
  let presenter: AdminBrandPresenter;
  let mockBrandService: jest.Mocked<IBrandService>;
  let mockView: jest.Mocked<AdminBrandOutputLogic>;

  beforeEach(() => {
    mockBrandService = {
      createBrand: jest.fn(),
      getBrands: jest.fn(),
    } as any;

    mockView = {
      openForm: false,
      showModalMessage: false,
      modalIcon: '',
      modalTitle: '',
      modalMessage: '',
      totalPages: 0,
      currentPage: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      tableDataBrand: [],
    } as any;

    TestBed.configureTestingModule({
      providers: [
        AdminBrandPresenter,
        { provide: ProviderServices.brandService, useValue: mockBrandService },
      ],
    });

    presenter = TestBed.inject(AdminBrandPresenter);
    presenter.setView(mockView);
  });

  it('should be created', () => {
    expect(presenter).toBeTruthy();
  });

  it('should call createBrand and show success modal on success', () => {
    const brandRequest: BrandRequest = { name: 'New Brand', description: 'Brand Description' };
    const response = new HttpResponse({ body: null });

    mockBrandService.createBrand.mockReturnValue(of(response));

    presenter.createBrand(brandRequest);

    expect(mockBrandService.createBrand).toHaveBeenCalledWith(brandRequest);
    expect(mockView.openForm).toBe(false);
    expect(mockView.showModalMessage).toBe(true);
    expect(mockView.modalIcon).toBe('/assets/icons/success-icon.svg');
    expect(mockView.modalTitle).toBe("Proceso existoso");
    expect(mockView.modalMessage).toBe("Categoria creada correctamente");
  });

  it('should call createBrand and show error modal on error', () => {
    const brandRequest: BrandRequest = { name: 'New Brand', description: 'Brand Description' };
    const errorResponse = new HttpErrorResponse({ error: { message: 'Error creating brand' } });

    mockBrandService.createBrand.mockReturnValue(throwError(errorResponse));

    presenter.createBrand(brandRequest);

    expect(mockBrandService.createBrand).toHaveBeenCalledWith(brandRequest);
    expect(mockView.openForm).toBe(false);
    expect(mockView.showModalMessage).toBe(true);
    expect(mockView.modalIcon).toBe('/assets/icons/error-icon.svg');
    expect(mockView.modalTitle).toBe("Algo salió mal");
    expect(mockView.modalMessage).toBe('Error creating brand');
  });

  it('should call getBrands and assign brand list on success', () => {
    const paginationRequest: PaginationRequest = { size: 10, sortDirection: 'ASC' };
    const page = 1;
    const brandResponse: BrandResponse = {
      totalPages: 2,
      currentPage: 1,
      pageSize: 10,
      totalElements: 10,
      hasNextPage: true,
      hasPreviousPage: false,
      list: [{ id: 1, name: 'Brand 1', description: 'description' }],
    };

    mockBrandService.getBrands.mockReturnValue(of(new HttpResponse({ body: brandResponse })));

    presenter.getBrands(paginationRequest, page);

    expect(mockBrandService.getBrands).toHaveBeenCalledWith(paginationRequest, page);
    expect(mockView.totalPages).toBe(brandResponse.totalPages);
    expect(mockView.currentPage).toBe(brandResponse.currentPage);
    expect(mockView.hasNextPage).toBe(brandResponse.hasNextPage);
    expect(mockView.hasPreviousPage).toBe(brandResponse.hasPreviousPage);
    expect(mockView.tableDataBrand).toEqual(brandResponse.list);
  });

  it('should log error when getBrands fails', () => {
    const paginationRequest: PaginationRequest = { size: 10, sortDirection: 'ASC' };
    const page = 1;
    const errorResponse = new HttpErrorResponse({ status: 500, statusText: 'Server Error' });

    mockBrandService.getBrands.mockReturnValue(throwError(errorResponse));

    console.log = jest.fn();
    presenter.getBrands(paginationRequest, page);

    expect(mockBrandService.getBrands).toHaveBeenCalledWith(paginationRequest, page);
    expect(console.log).toHaveBeenCalledWith(errorResponse);
  });
});
