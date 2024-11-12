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

  it('should initialize with default pagination request and fetch articles', () => {
    mockCartService.getArticlesCart.mockReturnValue(of(mockArticleCartResponse));
    fixture.detectChanges();

    expect(component.page).toBe(0);
    expect(component.paginationRequest.size).toBe(50);
    expect(component.paginationRequest.sortDirection).toBe('ASC');
    expect(mockCartService.getArticlesCart).toHaveBeenCalledWith(component.paginationRequest, component.page);
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
});
