import { TestBed } from '@angular/core/testing';
import { ICategoryService } from 'src/app/domain/interfaces/category.interface';
import { of, throwError } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CategpryRequest } from 'src/app/data/network/requests/category.request';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { CategoryResponse } from 'src/app/data/network/responses/category.response';
import { AdminCategoryPresenter } from 'src/app/ui/admin-category/presenter/admin-category.presenter';
import { AdminCategoryOutputLogic } from 'src/app/ui/admin-category/view/model/admin-category.model';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';

describe('AdminCategoryPresenter', () => {
  let presenter: AdminCategoryPresenter;
  let mockCategoryService: jest.Mocked<ICategoryService>;
  let mockView: jest.Mocked<AdminCategoryOutputLogic>;

  beforeEach(() => {
    mockCategoryService = {
      createCategory: jest.fn(),
      getCategories: jest.fn(),
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
      tableDataCategory: [],
    } as any;

    TestBed.configureTestingModule({
      providers: [
        AdminCategoryPresenter,
        { provide: ProviderServices.categoryService, useValue: mockCategoryService },
      ],
    });

    presenter = TestBed.inject(AdminCategoryPresenter);
    presenter.setView(mockView);
  });

  it('should be created', () => {
    expect(presenter).toBeTruthy();
  });

  it('should call createCategory and show success modal on success', () => {
    const categoryRequest: CategpryRequest = { name: 'New Category', description: 'Category Description' };
    const response = new HttpResponse({ body: null });

    mockCategoryService.createCategory.mockReturnValue(of(response));

    presenter.createCategory(categoryRequest);

    expect(mockCategoryService.createCategory).toHaveBeenCalledWith(categoryRequest);
    expect(mockView.openForm).toBe(false);
    expect(mockView.showModalMessage).toBe(true);
    expect(mockView.modalIcon).toBe('/assets/icons/success-icon.svg');
    expect(mockView.modalTitle).toBe("Proceso existoso");
    expect(mockView.modalMessage).toBe("Categoria creada correctamente");
  });

  it('should call createCategory and show error modal on error', () => {
    const categoryRequest: CategpryRequest = { name: 'New Category', description: 'Category Description' };
    const errorResponse = new HttpErrorResponse({ error: { message: 'Error creating category' } });

    mockCategoryService.createCategory.mockReturnValue(throwError(errorResponse));

    presenter.createCategory(categoryRequest);

    expect(mockCategoryService.createCategory).toHaveBeenCalledWith(categoryRequest);
    expect(mockView.openForm).toBe(false);
    expect(mockView.showModalMessage).toBe(true);
    expect(mockView.modalIcon).toBe('/assets/icons/error-icon.svg');
    expect(mockView.modalTitle).toBe("Algo salió mal");
    expect(mockView.modalMessage).toBe('Error creating category');
  });

  it('should call getCategories and assign category list on success', () => {
    const paginationRequest: PaginationRequest = { size: 10, sortDirection: 'ASC' };
    const page = 1;
    const categoryResponse: CategoryResponse = {
      totalPages: 2,
      currentPage: 1,
      pageSize: 10,
      totalElements: 10,
      hasNextPage: true,
      hasPreviousPage: false,
      list: [{ id: 1, name: 'Category 1', description: 'descripcion' }]
    };

    mockCategoryService.getCategories.mockReturnValue(of(new HttpResponse({ body: categoryResponse })));

    presenter.getCategories(paginationRequest, page);

    expect(mockCategoryService.getCategories).toHaveBeenCalledWith(paginationRequest, page);
    expect(mockView.totalPages).toBe(categoryResponse.totalPages);
    expect(mockView.currentPage).toBe(categoryResponse.currentPage);
    expect(mockView.hasNextPage).toBe(categoryResponse.hasNextPage);
    expect(mockView.hasPreviousPage).toBe(categoryResponse.hasPreviousPage);
    expect(mockView.tableDataCategory).toEqual(categoryResponse.list);
  });

  it('should log error when getCategories fails', () => {
    const paginationRequest: PaginationRequest = { size: 10, sortDirection: 'ASC' };
    const page = 1;
    const errorResponse = new HttpErrorResponse({ status: 500, statusText: 'Server Error' });

    mockCategoryService.getCategories.mockReturnValue(throwError(errorResponse));

    console.log = jest.fn();
    presenter.getCategories(paginationRequest, page);

    expect(mockCategoryService.getCategories).toHaveBeenCalledWith(paginationRequest, page);
    expect(console.log).toHaveBeenCalledWith(errorResponse);
  });
});
