import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ArticleCardComponent } from './article-card.component';
import { Router } from '@angular/router';

describe('ArticleCardComponent', () => {
  let component: ArticleCardComponent;
  let fixture: ComponentFixture<ArticleCardComponent>;
  let debugElement: DebugElement;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleCardComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    });

    fixture = TestBed.createComponent(ArticleCardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    component.articleData = {
      id: 1,
      name: 'Article',
      description: 'description',
      price: 200,
      quantity: 5,
      categories: [],
      brand: {
        id: 1,
        name: 'name',
        description: 'description'
      },
      imagePath: 'image-url'
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display article data correctly', () => {
    component.articleData = {
      id: 1,
      name: 'Article',
      description: 'description',
      price: 200,
      quantity: 5,
      categories: [],
      brand: {
        id: 1,
        name: 'brand name',
        description: 'description'
      },
      imagePath: 'image-url'
    };
    fixture.detectChanges();

    const titleEl = debugElement.query(By.css('.product-title')).nativeElement;
    const brandEl = debugElement.query(By.css('.product-details--text span')).nativeElement;
    const discountedPriceEl = debugElement.query(By.css('.discounted-price')).nativeElement;
    const originalPriceEl = debugElement.query(By.css('.original-price')).nativeElement;

    expect(titleEl.textContent).toContain('Article');
    expect(brandEl.textContent).toContain('brand name');
    expect(discountedPriceEl.textContent).toContain('$200');
    expect(originalPriceEl.textContent).toContain('$40');
  });

  it('should assign role if token exists in localStorage', () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('role', 'admin');
    
    component.assignRole();
    
    expect(component.role).toBe('admin');
  });

  it('should emit articleCartId with article ID when emitArticleCart is called', () => {
    component.articleData = { id: 1, name: 'Article', description: '', price: 0, quantity: 0, categories: [], brand: { id: 1, name: '', description: '' } ,
    imagePath: 'image-url' };
    jest.spyOn(component.articleCartId, 'emit');
    
    component.emitArticleCart();
    
    expect(component.articleCartId.emit).toHaveBeenCalledWith(1);
  });

  it('should navigate to article details page with article ID as query param', () => {
    component.articleData = { id: 1, name: 'Article', description: '', price: 0, quantity: 0, categories: [], brand: { id: 1, name: '', description: '' },
    imagePath: 'image-url' };
    const navigateSpy = jest.spyOn(router, 'navigate');
    
    component.redirectToArticleDetails();
    
    expect(navigateSpy).toHaveBeenCalledWith(['/article-details'], { queryParams: { id: 1 } });
  });

  afterEach(() => {
    localStorage.clear();
  });
});