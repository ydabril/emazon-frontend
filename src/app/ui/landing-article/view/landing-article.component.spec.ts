import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LandingArticleViewComponent } from './landing-article.component';

import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { ArticleServiceProvider } from 'src/app/data/providers/article/article.service.provider';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { ArticleSortBy } from 'src/app/core/constants/enums/article-sortby.enum';

describe('LandingArticleViewComponent', () => {
  let component: LandingArticleViewComponent;
  let fixture: ComponentFixture<LandingArticleViewComponent>;
  let mockArticleService: any;

  const mockResponse = new HttpResponse({
    body: { articles: [], totalItems: 0 }
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

    await TestBed.configureTestingModule({
      declarations: [LandingArticleViewComponent],
      providers: [
        ArticleServiceProvider,
        { provide: ProviderServices.articleService, useValue: mockArticleService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingArticleViewComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    mockArticleService.getArticles.mockReturnValue(of(mockResponse));
    fixture.detectChanges(); // Ejecuta ngOnInit
    expect(component).toBeTruthy();
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
});
