import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LandingArticleViewComponent } from './landing-article.component';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ArticleSortBy } from 'src/app/core/constants/enums/article-sortby.enum';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { ArticleResponse } from 'src/app/data/network/responses/article.response';
import { ArticleServiceProvider } from 'src/app/data/providers/article/article.service.provider';
import { UtilsService } from 'src/app/common/utils/utils.service';
import { CartServiceProvider } from 'src/app/data/providers/cart/cart.service.provider';

describe('LandingArticleViewComponent', () => {
  let component: LandingArticleViewComponent;
  let fixture: ComponentFixture<LandingArticleViewComponent>;
  let mockArticleService: any;
  let mockCartService: any;
  let mockUtilsService: any;
  let mockActivatedRoute: any;

  const mockResponse = new HttpResponse<ArticleResponse>({
    body: { list: [], totalElements: 10, pageSize: 10, totalPages: 0, currentPage: 0, hasNextPage: false, hasPreviousPage: false }
  });

  const mockErrorResponse = new HttpErrorResponse({
    error: { message: 'Error fetching articles' },
    status: 0,
    statusText: 'Unknown Error'
  });

  beforeEach(async () => {
    mockArticleService = {
      getArticles: jest.fn()
    };

    mockCartService = {
      addArticle: jest.fn()
    };

    mockUtilsService = {
      logout: jest.fn()
    };

    mockActivatedRoute = {
      queryParams: of({ showErrorModal: true, errorCode: 401 })
    };

    await TestBed.configureTestingModule({
      declarations: [LandingArticleViewComponent],
      providers: [
        ArticleServiceProvider,
        CartServiceProvider,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ProviderServices.articleService, useValue: mockArticleService },
        { provide: ProviderServices.cartService, useValue: mockCartService },
        { provide: UtilsService, useValue: mockUtilsService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingArticleViewComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    mockArticleService.getArticles.mockReturnValue(of(mockResponse));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // Test de addArticleCart
  it('should add article to cart and show success modal', () => {
    const articleId = 1;
    const mockCartResponse = new HttpResponse<any>({ body: { message: 'Articulo creado correctamente' } });
    mockCartService.addArticle.mockReturnValue(of(mockCartResponse));
    component.articleQuantity = 1;

    component.addArticleCart(articleId);

    expect(mockCartService.addArticle).toHaveBeenCalledWith({ articleId: articleId, quantity: 1 });
    expect(component.showModalMessage).toBe(true);
    expect(component.modalTitle).toBe("Proceso exitoso");
    expect(component.modalMessage).toBe("Articulo creado correctamente");
  });

  it('should show error modal when addArticleCart fails', () => {
    const articleId = 1;
    mockCartService.addArticle.mockReturnValue(throwError(() => mockErrorResponse));
    component.articleQuantity = 1;

    component.addArticleCart(articleId);

    expect(mockCartService.addArticle).toHaveBeenCalledWith({ articleId: articleId, quantity: 1 });
    expect(component.showModalMessage).toBe(true);
    expect(component.modalTitle).toBe("No se pudo agregar articulo al carrito");
    expect(component.modalMessage).toBe("Error fetching articles");
  });

  it('should toggle showHeaderMenu on changeHeaderMenu', () => {
    component.showHeaderMenu = false;

    component.changeHeaderMenu();

    expect(component.showHeaderMenu).toBe(true);

    component.changeHeaderMenu();

    expect(component.showHeaderMenu).toBe(false);
  });

  it('should call logout, hide header menu, and revalidate token on logout', () => {
    component.showHeaderMenu = true;
    component.existToken = true;

    component.logout();

    expect(mockUtilsService.logout).toHaveBeenCalled();
    expect(component.showHeaderMenu).toBe(false);
    expect(component.existToken).toBe(false);
  });

  it('should initialize with default pagination request', () => {
    const paginationRequest: PaginationRequest = { size: 10, sortDirection: 'ASC' };
    mockArticleService.getArticles.mockReturnValue(of(mockResponse));

    fixture.detectChanges();

    expect(mockArticleService.getArticles).toHaveBeenCalledWith(
      paginationRequest,
      component.page,
      component.sortBy
    );
  });

  it('should update sortBy and fetch articles on sortByChange', () => {
    const sortOption: ArticleSortBy = ArticleSortBy.articleName;
    const paginationRequest: PaginationRequest = { size: 10, sortDirection: 'ASC' };

    mockArticleService.getArticles.mockReturnValue(of(mockResponse));
    fixture.detectChanges();

    component.sortByChange(sortOption);

    expect(component.sortBy).toBe(sortOption);
    expect(mockArticleService.getArticles).toHaveBeenCalledWith(
      paginationRequest,
      component.page,
      sortOption
    );
  });

  it('should update page and fetch articles on nextPage', () => {
    const newPage = 2;
    const paginationRequest: PaginationRequest = { size: 10, sortDirection: 'ASC' };

    mockArticleService.getArticles.mockReturnValue(of(mockResponse));
    fixture.detectChanges();

    component.nextPage(newPage);

    expect(component.page).toBe(newPage);
    expect(mockArticleService.getArticles).toHaveBeenCalledWith(
      paginationRequest,
      newPage,
      component.sortBy
    );
  });

  it('should show error modal if showErrorModal is true in query params', () => {
    mockArticleService.getArticles.mockReturnValue(of(mockResponse));
    fixture.detectChanges();

    expect(component.showModalMessage).toBe(true);
    expect(component.modalTitle).toBe("Algo salió mal");
    expect(component.modalMessage).toBe("Acceso denegano");
  });

  it('should set existToken and userName if token exists in localStorage', () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('userName', 'Test User');
    component.validateExistToken();

    expect(component.existToken).toBe(true);
    expect(component.userName).toBe('Test User');
  });

  afterEach(() => {
    localStorage.clear();
  });
});