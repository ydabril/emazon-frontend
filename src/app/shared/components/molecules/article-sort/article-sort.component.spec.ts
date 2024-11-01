import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleSortComponent } from './article-sort.component';
import { ArticleSortBy } from 'src/app/core/constants/enums/article-sortby.enum';

describe('ArticleSortComponent', () => {
  let component: ArticleSortComponent;
  let fixture: ComponentFixture<ArticleSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleSortComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct default sort option', () => {
    expect(component.selectedSort).toBe(ArticleSortBy.articleName);
  });

  it('should update selectedSort when selectSortOption is called', () => {
    const newSortOption = ArticleSortBy.brandName;

    component.selectSortOption(newSortOption);

    expect(component.selectedSort).toBe(newSortOption);
  });
});
