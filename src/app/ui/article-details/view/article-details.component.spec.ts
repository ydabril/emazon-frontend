import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { Article } from 'src/app/data/network/responses/article.response';
import { ArticleDetailsViewComponent } from './article-details.component';
import { ArticleServiceProvider } from 'src/app/data/providers/article/article.service.provider';
import { CartServiceProvider } from 'src/app/data/providers/cart/cart.service.provider';


describe('ArticleDetailsViewComponent', () => {
  let component: ArticleDetailsViewComponent;
  let fixture: ComponentFixture<ArticleDetailsViewComponent>;
  let mockArticleService: any;
  let mockCartService: any;
  let mockActivatedRoute: any;

  const mockArticleResponse = new HttpResponse<Article>({
    body: { id: 1, name: 'Sample Article', quantity: 10, price: 100 } as Article
  });

  const mockCartSuccessResponse = new HttpResponse<any>({
    body: { message: 'Articulo agregado al carrito' }
  });

  const mockErrorResponse = new HttpErrorResponse({
    error: { message: 'Stock insuficiente', estimatedRestockDate: '2024-12-01' },
    status: 400,
    statusText: 'Bad Request'
  });

  beforeEach(async () => {
    mockArticleService = {
      getArticleByid: jest.fn()
    };

    mockCartService = {
      addArticle: jest.fn()
    };

    mockActivatedRoute = {
      queryParams: of({ id: 1 })
    };

    await TestBed.configureTestingModule({
      declarations: [ArticleDetailsViewComponent],
      providers: [
        ArticleServiceProvider,
        CartServiceProvider,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ProviderServices.articleService, useValue: mockArticleService },
        { provide: ProviderServices.cartService, useValue: mockCartService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailsViewComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch article details on initialization', () => {
    mockArticleService.getArticleByid.mockReturnValue(of(mockArticleResponse));
    fixture.detectChanges();
  
    expect(mockArticleService.getArticleByid).toHaveBeenCalledWith(1);
    
    expect(component.articleData).not.toBeNull();
    expect(component.articleData).toEqual(mockArticleResponse.body as Article);
  });



  it('should add article to cart and show success modal', () => {
    component.articleId = 1;
    component.quantity = 2;
    mockCartService.addArticle.mockReturnValue(of(mockCartSuccessResponse));

    component.addArticleCart();

    expect(mockCartService.addArticle).toHaveBeenCalledWith({ articleId: 1, quantity: 2 });
    expect(component.showModalMessage).toBe(true);
    expect(component.modalTitle).toBe('Proceso exitoso');
    expect(component.modalMessage).toBe('Articulo agregado al carrito');
  });

  it('should show error modal when adding to cart fails', () => {
    component.articleId = 1;
    component.quantity = 2;
    mockCartService.addArticle.mockReturnValue(throwError(() => mockErrorResponse));

    component.addArticleCart();

    expect(mockCartService.addArticle).toHaveBeenCalledWith({ articleId: 1, quantity: 2 });
    expect(component.showModalMessage).toBe(true);
    expect(component.modalTitle).toBe('Error en el carrito');
    expect(component.modalMessage).toBe('Stock insuficiente');
    expect(component.estimatedRestockDate).toBe('2024-12-01');
  });

  it('should increase quantity if it is less than available stock', () => {
    component.articleData = { quantity: 10 } as Article;
    component.quantity = 1;

    component.increaseQuantity();

    expect(component.quantity).toBe(2);
  });

  it('should not increase quantity if it is equal to available stock', () => {
    component.articleData = { quantity: 5 } as Article;
    component.quantity = 5;

    component.increaseQuantity();

    expect(component.quantity).toBe(5);
  });

  it('should decrease quantity if it is greater than 1', () => {
    component.quantity = 3;

    component.decreaseQuantity();

    expect(component.quantity).toBe(2);
  });

  it('should not decrease quantity if it is 1', () => {
    component.quantity = 1;

    component.decreaseQuantity();

    expect(component.quantity).toBe(1);
  });

  it('should close modal message', () => {
    component.showModalMessage = true;

    component.closeModalMessage();

    expect(component.showModalMessage).toBe(false);
  });
});
