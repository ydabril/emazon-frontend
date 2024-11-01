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
import { AdminArticleViewComponent } from './admin-article.component.';

describe('AdminArticleViewComponent', () => {
  let component: AdminArticleViewComponent;
  let fixture: ComponentFixture<AdminArticleViewComponent>;
  let mockCategoryService: jest.Mocked<ICategoryService>;
  let mockBrandService: jest.Mocked<IBrandService>;
  let mockArticleService: jest.Mocked<IArticleService>;

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

    const response: HttpResponse<any> = new HttpResponse({ body: null });
    mockArticleService.createArticle.mockReturnValue(of(response));

    component.saveArticle(articleRequest);

    expect(mockArticleService.createArticle).toHaveBeenCalledWith(articleRequest);
    expect(component.openForm).toBe(false);
    expect(component.showModalMessage).toBe(true);
    expect(component.modalIcon).toBe('/assets/icons/success-icon.svg');
    expect(component.modalTitle).toBe("Proceso existoso");
    expect(component.modalMessage).toBe("Articulo creado correctamente");
  });

  it('should show error modal on save article failure', () => {
    const articleRequest = { name: 'New Article', description: 'Description', quantity: 1, price: 10000, categoryIds: [1, 3], brandId: 1 };
    const errorResponse = new HttpErrorResponse({ error: { message: 'Error creating article' } });
    mockArticleService.createArticle.mockReturnValue(throwError(() => errorResponse));

    component.saveArticle(articleRequest);

    expect(mockArticleService.createArticle).toHaveBeenCalledWith(articleRequest);
    expect(component.openForm).toBe(false);
    expect(component.showModalMessage).toBe(true);
    expect(component.modalIcon).toBe('/assets/icons/error-icon.svg');
    expect(component.modalTitle).toBe("Algo salió mal");
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
});
