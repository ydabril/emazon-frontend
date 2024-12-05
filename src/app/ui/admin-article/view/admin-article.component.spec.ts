import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { ArticleServiceProvider } from 'src/app/data/providers/article/article.service.provider';
import { BrandServiceProvider } from 'src/app/data/providers/brand/brand.service.provider';
import { CategoryServiceProvider } from 'src/app/data/providers/category/category.service.provider';
import { IArticleService } from 'src/app/domain/interfaces/article.interface';
import { IBrandService } from 'src/app/domain/interfaces/brand.interface';
import { ICategoryService } from 'src/app/domain/interfaces/category.interface';
import { AdminArticleViewComponent } from './admin-article.component';
import { ArticleResponse } from 'src/app/data/network/responses/article.response';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { EM_ICON } from 'src/app/core/constants/em-icons';

describe('AdminArticleViewComponent', () => {
  let component: AdminArticleViewComponent;
  let fixture: ComponentFixture<AdminArticleViewComponent>;
  let mockCategoryService: jest.Mocked<ICategoryService>;
  let mockBrandService: jest.Mocked<IBrandService>;
  let mockArticleService: any;

  beforeEach(async () => {
    mockCategoryService = {
      getCategories: jest.fn().mockReturnValue(of(new HttpResponse({
        body: { list: [{ id: 1, name: 'Category 1', description: 'descripcion' }] }
      }))),
    } as any;

    mockBrandService = {
      getBrands: jest.fn().mockReturnValue(of(new HttpResponse({
        body: { list: [{ id: 1, name: 'Brand 1', description: 'descripcion' }] }
      }))),
    } as any;

    mockArticleService = {
      getArticles: jest.fn(),
      addSupply: jest.fn(),
      createArticle: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [AdminArticleViewComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        CategoryServiceProvider,
        BrandServiceProvider,
        ArticleServiceProvider,
        { provide: ProviderServices.categoryService, useValue: mockCategoryService },
        { provide: ProviderServices.brandService, useValue: mockBrandService },
        { provide: ProviderServices.articleService, useValue: mockArticleService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminArticleViewComponent);
    mockArticleService.getArticles.mockReturnValue(of({ body: { articles: [], pagination: {} } }));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with pagination request and page', () => {
    expect(component.paginationRequest).toEqual({ sortDirection: 'ASC', size: 50 });
    expect(component.page).toBe(0);
  });

  it('should fetch category list on initialization', () => {
    component.getCategoryList(component.paginationRequest, component.page);
    expect(mockCategoryService.getCategories).toHaveBeenCalledWith(component.paginationRequest, component.page);
    expect(component.listDataCategory).toEqual([{ id: 1, name: 'Category 1', description: 'descripcion' }]);
  });

  it('should fetch brand list on initialization', () => {
    component.getBrandList(component.paginationRequest, component.page);
    expect(mockBrandService.getBrands).toHaveBeenCalledWith(component.paginationRequest, component.page);
    expect(component.listDataBrand).toEqual([{ id: 1, name: 'Brand 1', description: 'descripcion' }]);
  });

  it('should save an article and show success modal on success', () => {
    const articleRequest = {
      name: 'New Article',
      description: 'Description',
      quantity: 1,
      price: 10000,
      categoryIds: [1, 3],
      brandId: 1
    };
  
    const mockFile = new File(['image'], 'test-image.jpg', { type: 'image/jpeg' });
    component.onImageSelected(mockFile); // Simular selección de imagen
    const response: HttpResponse<any> = new HttpResponse({ body: null });
    mockArticleService.createArticle.mockReturnValue(of(response));
  
    component.saveArticle(articleRequest);
  
    const formData = new FormData();
    formData.append(
      'articleData',
      new Blob([JSON.stringify(articleRequest)], { type: 'application/json' })
    );
    formData.append('image', mockFile);
  
    expect(mockArticleService.createArticle).toHaveBeenCalledWith(formData);
    expect(component.openForm).toBe(false);
    expect(component.showModalMessage).toBe(true);
    expect(component.modalIcon).toBe(EM_ICON['success']);
    expect(component.modalTitle).toBe("Proceso exitoso");
    expect(component.modalMessage).toBe("Artículo creado correctamente");
  });

  it('should show error modal on save article failure', () => {
    const articleRequest = {
      name: 'New Article',
      description: 'Description',
      quantity: 1,
      price: 10000,
      categoryIds: [1, 3],
      brandId: 1,
    };
  
    const mockFile = new File(['image'], 'test-image.jpg', { type: 'image/jpeg' });
    component.onImageSelected(mockFile);
    
    const errorResponse = new HttpErrorResponse({
      status: 400,
      error: { message: 'Error creating article' },
    });
  
    mockArticleService.createArticle.mockReturnValue(throwError(() => errorResponse));
  
    component.saveArticle(articleRequest);
  
    const formData = new FormData();
    formData.append(
      'articleData',
      new Blob([JSON.stringify(articleRequest)], { type: 'application/json' })
    );
    formData.append('image', mockFile);
  
    expect(mockArticleService.createArticle).toHaveBeenCalledWith(formData);
    expect(component.openForm).toBe(false);
    expect(component.showModalMessage).toBe(true);
    expect(component.modalIcon).toBe('/assets/icons/error-icon.svg');
    expect(component.modalTitle).toBe('Algo salió mal');
    expect(component.modalMessage).toBe('Error creating article');
  });
  

  it('should toggle the navigation menu', () => {
    const initialExpandedState = component.isNavMenuExpanded;
    component.toggleNavMenu();
    expect(component.isNavMenuExpanded).toBe(!initialExpandedState);
  });

  it('should open and close the article form', () => {
    component.openFormArticle();
    expect(component.openForm).toBe(true);

    component.closeFormArticle(false);
    expect(component.openForm).toBe(false);
  });

  it('should close the modal message', () => {
    component.showModalMessage = true;
    component.closeModalMessage();
    expect(component.showModalMessage).toBe(false);
  });

  it('should assign article ID and open supply form', () => {
    component.assignArticleId(1);
    expect(component.articleId).toBe(1);
    expect(component.openFormSupply).toBe(true);
  });

  it('should add a supply and show success modal', () => {
    const supplyRequest = { articleId: 1, quantity: 10 };
    const response: HttpResponse<any> = new HttpResponse({ body: null });
    mockArticleService.addSupply.mockReturnValue(of(response));

    component.articleId = 1;
    component.addSupply(supplyRequest);

    expect(mockArticleService.addSupply).toHaveBeenCalledWith(supplyRequest);
    expect(component.showModalMessage).toBe(true);
    expect(component.modalIcon).toBe('/assets/icons/success-icon.svg');
    expect(component.modalTitle).toBe("Proceso exitoso");
    expect(component.modalMessage).toBe("Suministro agregado correctamente");
  });

  it('should show error modal when adding supply fails', () => {
    const supplyRequest = { articleId: 1, quantity: 10 };
    const errorResponse = new HttpErrorResponse({ error: { message: 'Error adding supply' } });
    mockArticleService.addSupply.mockReturnValue(throwError(() => errorResponse));

    component.addSupply(supplyRequest);

    expect(component.showModalMessage).toBe(true);
    expect(component.modalIcon).toBe('/assets/icons/error-icon.svg');
    expect(component.modalTitle).toBe("Algo salió mal");
    expect(component.modalMessage).toBe('Error adding supply');
  });

  it('should fetch and assign article list', () => {
    const articleResponse: ArticleResponse = { list: [], totalElements: 10, pageSize: 10, totalPages: 5, currentPage: 1, hasNextPage: false, hasPreviousPage: false };
    const paginationRequest: PaginationRequest = {size: 10, sortDirection: 'ASC'}
    mockArticleService.getArticles.mockReturnValue(of(new HttpResponse({ body: articleResponse })));

    component.getArticles(paginationRequest);

    expect(mockArticleService.getArticles).toHaveBeenCalledWith(component.paginationRequest, component.page, component.sortBy);
    expect(component.listDataArticle).toEqual(articleResponse.list);
    expect(component.totalPages).toBe(5);
    expect(component.currentPage).toBe(1);
    expect(component.hasNextPage).toBe(false);
    expect(component.hasPreviousPage).toBe(false);
  });

  it('should close supply form', () => {
    component.openFormSupply = true;
    component.closeFormSupply(false);
    expect(component.openFormSupply).toBe(false);
  });

  it('should log error when no image is selected for saving an article', () => {
    const articleRequest = {
      name: 'New Article',
      description: 'Description',
      quantity: 1,
      price: 10000,
      categoryIds: [1, 3],
      brandId: 1,
    };
  
    console.error = jest.fn();
  
    component.saveArticle(articleRequest);
  
    expect(console.error).toHaveBeenCalledWith('No se seleccionó una imagen');
    expect(mockArticleService.createArticle).not.toHaveBeenCalled();
  });
  
});
