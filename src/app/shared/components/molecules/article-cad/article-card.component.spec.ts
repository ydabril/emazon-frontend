import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleCardComponent } from './article-card.component';
import { Article } from 'src/app/data/network/responses/article.response';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ArticleCardComponent', () => {
    let component: ArticleCardComponent;
    let fixture: ComponentFixture<ArticleCardComponent>;
    let debugElement: DebugElement;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ArticleCardComponent]
      });
  
      fixture = TestBed.createComponent(ArticleCardComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
    });
  
    it('should create the component', () => {
      component.articleData ={
        name: 'Article',
        price: 200,
        quantity: 5,
        categories: [],
        brand: {
          id: 1,
          name: 'name',
          description: 'description'
        }
      };
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  
    it('should display article data correctly', () => {
      component.articleData = {
        name: 'Article',
        price: 200,
        quantity: 5,
        categories: [],
        brand: {
          id: 1,
          name: 'brand name',
          description: 'description'
        }
      };
      fixture.detectChanges();
  
      const titleEl = debugElement.query(By.css('.product-title')).nativeElement;
      const brandEl = debugElement.query(By.css('.product-details--text span')).nativeElement;
      const discountedPriceEl = debugElement.query(By.css('.discounted-price')).nativeElement;
      const originalPriceEl = debugElement.query(By.css('.original-price')).nativeElement;
  
      expect(titleEl.textContent).toContain('Article');
      expect(brandEl.textContent).toContain('brand name');
      expect(discountedPriceEl.textContent).toContain('$200');
      expect(originalPriceEl.textContent).toContain('$300');
    });
  });


