import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersWebApp } from 'src/app/core/constants/enums/providers.enum';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { AdminCategoryViewComponent } from 'src/app/ui/admin-category/view/admin-category..component';
import { AdminCategoryInputLogic } from 'src/app/ui/admin-category/view/model/admin-category.model';


describe('AdminCategoryViewComponent', () => {
  let component: AdminCategoryViewComponent;
  let fixture: ComponentFixture<AdminCategoryViewComponent>;
  let mockPresenter: jest.Mocked<AdminCategoryInputLogic>;

  beforeEach(async () => {
    mockPresenter = {
      setView: jest.fn(),
      createCategory: jest.fn(),
      getCategories: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [AdminCategoryViewComponent],
      providers: [
        {
          provide: ProvidersWebApp.adminCategoryPresenter,
          useValue: mockPresenter,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the navigation menu', () => {
    const initialExpandedState = component.isNavMenuExpanded;
    component.toggleNavMenu();
    expect(component.isNavMenuExpanded).toBe(!initialExpandedState);
  });

  it('should open the category form', () => {
    component.openFormCategory();
    expect(component.openForm).toBe(true);
  });

  it('should close the category form', () => {
    component.openForm = true;
    component.closeFormCategory(false);
    expect(component.openForm).toBe(false);
  });

  it('should call getCategorie with paginationRequest', () => {
    const paginationRequest: PaginationRequest = { size: 10, sortDirection: 'ASC' };
    component.paginationRequest = paginationRequest;
    component.getCategorie(paginationRequest);
    expect(mockPresenter.getCategories).toHaveBeenCalledWith(paginationRequest, component.page);
  });

  it('should call saveCategory on the presenter', () => {
    const categoryRequest = { name: 'New Category', description: 'Category Description' }; // Ejemplo de objeto
    component.saveCategory(categoryRequest);
    expect(mockPresenter.createCategory).toHaveBeenCalledWith(categoryRequest);
  });

  it('should log the next page value and call getCategorie', () => {
    const pageValue = 1;
    const paginationRequest: PaginationRequest = { size: 10, sortDirection: 'ASC' };
    component.paginationRequest = paginationRequest;
    component.nextPage(pageValue);
    expect(component.page).toBe(pageValue);
    expect(mockPresenter.getCategories).toHaveBeenCalledWith(paginationRequest, pageValue);
  });
});
