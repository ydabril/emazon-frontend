import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartListComponent } from './cart-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ArticleCart, ArticleCartResponse } from 'src/app/data/network/responses/article-cart.response';
import { CategoryServiceProvider } from 'src/app/data/providers/category/category.service.provider';
import { BrandServiceProvider } from 'src/app/data/providers/brand/brand.service.provider';
import { CartServiceProvider } from 'src/app/data/providers/cart/cart.service.provider';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { Brand, BrandResponse } from 'src/app/data/network/responses/brand.response';
import { Category, CategoryResponse } from 'src/app/data/network/responses/category.response';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';

describe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;
  let mockCategoryService: any;
  let mockBrandService: any;
  let mockCartService: any;

  const mockArticleCartResponse = new HttpResponse<ArticleCartResponse>({
    body: { list: [], totalElements: 10, pageSize: 10, totalPages: 1, totalPrice: 1000, currentPage: 0, hasNextPage: false, hasPreviousPage: false }
  });

  const mockErrorResponse = new HttpErrorResponse({
    error: { message: 'Error fetching articles' },
    status: 0,
    statusText: 'Unknown Error'
  });

  beforeEach(async () => {
    mockCategoryService = { getCategories: jest.fn() };
    mockBrandService = { getBrands: jest.fn() };
    mockCartService = {
      getArticlesCart: jest.fn(),
      deleteArticleCart: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartListComponent],
      providers: [
        CategoryServiceProvider,
        BrandServiceProvider,
        CartServiceProvider,
        { provide: ProviderServices.categoryService, useValue: mockCategoryService },
        { provide: ProviderServices.brandService, useValue: mockBrandService },
        { provide: ProviderServices.cartService, useValue: mockCartService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCategoryList, getBrandList, and getArticles on ngOnInit', () => {
    const categories = [{ id: 1, name: 'Test Category' }] as Category[];
    const response = new HttpResponse<CategoryResponse>({ body: { list: categories } as  CategoryResponse});
    mockCategoryService.getCategories.mockReturnValue(of(response));

    const brands = [{ id: 1, name: 'Test Brand' }] as Brand[];
    const responseBrand = new HttpResponse<BrandResponse>({ body: { list: brands } as BrandResponse });
    mockBrandService.getBrands.mockReturnValue(of(responseBrand));

    const articles = [{ id: 1, name: 'Test Article' }] as ArticleCart[];
    const responseArticle = new HttpResponse<ArticleCartResponse>({ body: { list: articles, totalElements: 10, pageSize: 10, totalPages: 1, totalPrice: 1000, currentPage: 0, hasNextPage: false, hasPreviousPage: false } });
    mockCartService.getArticlesCart.mockReturnValue(of(responseArticle));

    jest.spyOn(component, 'getCategoryList');
    jest.spyOn(component, 'getBrandList');
    jest.spyOn(component, 'getArticles');
  
    component.ngOnInit();
  
    expect(component.getCategoryList).toHaveBeenCalledWith(component.paginationRequestFilter, component.pageFilter);
    expect(component.getBrandList).toHaveBeenCalledWith(component.paginationRequestFilter, component.pageFilter);
    expect(component.getArticles).toHaveBeenCalledWith(component.paginationRequest);
  });
  

  it('should assign article cart list on successful getArticles call', () => {
    const articles = [{ id: 1, name: 'Test Article' }] as ArticleCart[];
    const response = new HttpResponse<ArticleCartResponse>({ body: { list: articles, totalElements: 10, pageSize: 10, totalPages: 1, totalPrice: 1000, currentPage: 0, hasNextPage: false, hasPreviousPage: false } });
    mockCartService.getArticlesCart.mockReturnValue(of(response));

    component.getArticles(component.paginationRequest);

    expect(component.articleCartList).toEqual(articles);
  });

  it('should log error on failed getArticles call', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    mockCartService.getArticlesCart.mockReturnValue(throwError(() => mockErrorResponse));

    component.getArticles(component.paginationRequest);

    expect(consoleSpy).toHaveBeenCalledWith(mockErrorResponse);
  });

  it('should delete article and fetch articles again on successful deleteArticleCart call', () => {
    const articleId = 1;
    const response = new HttpResponse<unknown>({});
    mockCartService.deleteArticleCart.mockReturnValue(of(response));
    jest.spyOn(component, 'getArticles');

    component.deleteArticleCart(articleId);

    expect(mockCartService.deleteArticleCart).toHaveBeenCalledWith(articleId);
    expect(component.getArticles).toHaveBeenCalledWith(component.paginationRequest);
  });

  it('should log error on failed deleteArticleCart call', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const articleId = 1;
    mockCartService.deleteArticleCart.mockReturnValue(throwError(() => mockErrorResponse));

    component.deleteArticleCart(articleId);

    expect(consoleSpy).toHaveBeenCalledWith(mockErrorResponse);
  });

  it('should assign category and call getArticles on assignCategory', () => {
    const category = 'Test Category';
    const articles = [{ id: 1, name: 'Test Article' }] as ArticleCart[];
    const response = new HttpResponse<ArticleCartResponse>({ body: { list: articles, totalElements: 10, pageSize: 10, totalPages: 1, totalPrice: 1000, currentPage: 0, hasNextPage: false, hasPreviousPage: false } });
    mockCartService.getArticlesCart.mockReturnValue(of(response));

    jest.spyOn(component, 'getArticles');
  
    component.assignCategory(category);
  
    expect(component.categoryValue).toBe(category);
    expect(component.getArticles).toHaveBeenCalledWith(component.paginationRequest);
  });

  it('should assign category list on successful getCategoryList call', () => {
    const categories = [{ id: 1, name: 'Test Category' }] as Category[];
    const response = new HttpResponse<CategoryResponse>({ body: { list: categories } as  CategoryResponse});
    mockCategoryService.getCategories.mockReturnValue(of(response));
  
    component.getCategoryList(component.paginationRequest, component.pageFilter);
  
    expect(component.listDataCategory).toEqual(categories);
  });
  
  it('should assign brand list on successful getBrandList call', () => {
    const brands = [{ id: 1, name: 'Test Brand' }] as Brand[];
    const response = new HttpResponse<BrandResponse>({ body: { list: brands } as BrandResponse });
    mockBrandService.getBrands.mockReturnValue(of(response));
  
    component.getBrandList(component.paginationRequest, component.pageFilter);
  
    expect(component.listDataBrand).toEqual(brands);
  });

  it('should assign brand and call getArticles on assignBrand', () => {
    const brand = 'Test Brand';
    const articles = [{ id: 1, name: 'Test Article' }] as ArticleCart[];
    const response = new HttpResponse<ArticleCartResponse>({ body: { list: articles, totalElements: 10, pageSize: 10, totalPages: 1, totalPrice: 1000, currentPage: 0, hasNextPage: false, hasPreviousPage: false } });
    mockCartService.getArticlesCart.mockReturnValue(of(response));
    jest.spyOn(component, 'getArticles');
  
    component.assignBrand(brand);
  
    expect(component.brandValue).toBe(brand);
    expect(component.getArticles).toHaveBeenCalledWith(component.paginationRequest);
  });
  
  it('should update page and call getArticles on nextPage', () => {
    const newPage = 1;
    const articles = [{ id: 1, name: 'Test Article' }] as ArticleCart[];
    const response = new HttpResponse<ArticleCartResponse>({ body: { list: articles, totalElements: 10, pageSize: 10, totalPages: 1, totalPrice: 1000, currentPage: 0, hasNextPage: false, hasPreviousPage: false } });
    mockCartService.getArticlesCart.mockReturnValue(of(response));
    jest.spyOn(component, 'getArticles');
  
    component.nextPage(newPage);
  
    expect(component.page).toBe(newPage);
    expect(component.getArticles).toHaveBeenCalledWith(component.paginationRequest);
  });

  it('should assign values to articleCartList on assignArticleCartList call', () => {
    const articleCartResponse: ArticleCartResponse = { list: [{ id: 1, name: 'Test Article' }], totalPages: 1, currentPage: 0, hasNextPage: false, hasPreviousPage: false } as ArticleCartResponse;
    
    component.assignArticleCartList(articleCartResponse);
  
    expect(component.articleCartList).toEqual(articleCartResponse.list);
    expect(component.totalPages).toBe(articleCartResponse.totalPages);
    expect(component.currentPage).toBe(articleCartResponse.currentPage);
    expect(component.hasNextPage).toBe(articleCartResponse.hasNextPage);
    expect(component.hasPreviousPage).toBe(articleCartResponse.hasPreviousPage);
  });
  
  
});
