import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EM_ICON } from 'src/app/core/constants/em-icons';
import { PaginationComponent } from 'src/app/shared/components/atoms/pagination/pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize arrow paths correctly', () => {
    expect(component.pathArrowLeft).toBe(EM_ICON['arrowLeft']);
    expect(component.pathArrowRight).toBe(EM_ICON['arrowRight']);
  });

  it('should emit correct page number when `changePage` is called', () => {
    const pageChangeSpy = jest.spyOn(component.pageNumberChange, 'emit');
    const mockEvent = {
      srcElement: {
        innerText: '3'
      }
    };

    component.changePage(mockEvent);
    expect(component.pageNumber).toBe(2); // Since the page number is 0-based
    expect(pageChangeSpy).toHaveBeenCalledWith(2);
  });

  it('should increment currentPage and emit nextPage', () => {
    component.currentPage = 1;
    const pageChangeSpy = jest.spyOn(component.pageNumberChange, 'emit');

    component.nextPage();

    expect(component.currentPage).toBe(2);
    expect(pageChangeSpy).toHaveBeenCalledWith(2);
  });

  it('should decrement currentPage and emit prevPage', () => {
    component.currentPage = 2;
    const pageChangeSpy = jest.spyOn(component.pageNumberChange, 'emit');

    component.prevPage();

    expect(component.currentPage).toBe(1);
    expect(pageChangeSpy).toHaveBeenCalledWith(1);
  });

  it('should emit correct page number when nextPage or prevPage is called', () => {
    const pageChangeSpy = jest.spyOn(component.pageNumberChange, 'emit');

    component.currentPage = 5;
    component.nextPage();
    expect(component.currentPage).toBe(6);
    expect(pageChangeSpy).toHaveBeenCalledWith(6);

    component.prevPage();
    expect(component.currentPage).toBe(5);
    expect(pageChangeSpy).toHaveBeenCalledWith(5);
  });
});
