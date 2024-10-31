import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProvidersWebApp } from 'src/app/core/constants/enums/providers.enum';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { AdminBrandInputLogic } from 'src/app/ui/admin-brand/view/model/admin-brand.model';
import { BrandRequest } from 'src/app/data/network/requests/brandRequest';
import { adminBrandViewComponent } from 'src/app/ui/admin-brand/view/admin-brand.component.';

describe('AdminBrandViewComponent', () => {
  let component: adminBrandViewComponent;
  let fixture: ComponentFixture<adminBrandViewComponent>;
  let mockPresenter: jest.Mocked<AdminBrandInputLogic>;

  beforeEach(async () => {
    mockPresenter = {
      setView: jest.fn(),
      createBrand: jest.fn(),
      getBrands: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [adminBrandViewComponent],
      providers: [
        {
          provide: ProvidersWebApp.adminBrandPresenter,
          useValue: mockPresenter,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(adminBrandViewComponent);
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

  it('should open the brand form', () => {
    component.openFormCategory();
    expect(component.openForm).toBe(true);
  });

  it('should close the brand form', () => {
    component.openForm = true;
    component.closeFormBrand(false);
    expect(component.openForm).toBe(false);
  });

  it('should call getBrands with paginationRequest', () => {
    const paginationRequest: PaginationRequest = { size: 10, sortDirection: 'ASC' };
    component.paginationRequest = paginationRequest;
    component.getBrands(paginationRequest);
    expect(mockPresenter.getBrands).toHaveBeenCalledWith(paginationRequest, component.page);
  });

  it('should call saveCategory on the presenter', () => {
    const brandRequest: BrandRequest = { name: 'New Brand', description: 'Brand Description' }; // Ejemplo de objeto
    component.saveCategory(brandRequest);
    expect(mockPresenter.createBrand).toHaveBeenCalledWith(brandRequest);
  });

  it('should log the next page value and call getBrands', () => {
    const pageValue = 1;
    const paginationRequest: PaginationRequest = { size: 10, sortDirection: 'ASC' };
    component.paginationRequest = paginationRequest;
    component.nextPage(pageValue);
    expect(component.page).toBe(pageValue);
    expect(mockPresenter.getBrands).toHaveBeenCalledWith(paginationRequest, pageValue);
  });
});
