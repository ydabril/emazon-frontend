import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleListComponent } from './article-list.component';
import { EventEmitter } from '@angular/core';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { ArticleSortBy } from 'src/app/core/constants/enums/article-sortby.enum';


describe('ArticleListComponent', () => {
    let component: ArticleListComponent;
    let fixture: ComponentFixture<ArticleListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ArticleListComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ArticleListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should emit paginationChange with the correct value', () => {
        const paginationRequest: PaginationRequest = { size: 10, sortDirection: 'ASC' };
        component.paginationChange = new EventEmitter<any>();
        const paginationChangeSpy = jest.spyOn(component.paginationChange, 'emit');

        component.emitPaginationChange(paginationRequest);

        expect(paginationChangeSpy).toHaveBeenCalledWith(paginationRequest);
    });

    it('should emit sortChange with the correct sort option', () => {
        const sortOption: ArticleSortBy = ArticleSortBy.articleName;
        component.sortChange = new EventEmitter<ArticleSortBy>();
        const sortChangeSpy = jest.spyOn(component.sortChange, 'emit');

        component.emitSortBy(sortOption);

        expect(sortChangeSpy).toHaveBeenCalledWith(sortOption);
    });
});



