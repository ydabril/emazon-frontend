import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DataTableComponent } from 'src/app/shared/components/molecules/datatable/data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent<any>;
  let fixture: ComponentFixture<DataTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render column headers', () => {
    component.columns = [
      { header: 'Name', field: 'name' },
      { header: 'Age', field: 'age' }
    ];
    fixture.detectChanges();

    const headers = fixture.debugElement.queryAll(By.css('th'));
    expect(headers.length).toBe(2);
    expect(headers[0].nativeElement.textContent.trim()).toBe('Name');
    expect(headers[1].nativeElement.textContent.trim()).toBe('Age');
  });

  it('should render rows', () => {
    component.columns = [
      { header: 'Name', field: 'name' },
      { header: 'Age', field: 'age' }
    ];
    component.rows = [
      { name: 'John', age: 25 },
      { name: 'Doe', age: 30 }
    ];
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
  });

  it('should render row data', () => {
    component.columns = [
      { header: 'Name', field: 'name' },
      { header: 'Age', field: 'age' }
    ];
    component.rows = [
      { name: 'John', age: 25 }
    ];
    fixture.detectChanges();

    const rowCells = fixture.debugElement.queryAll(By.css('tbody tr td'));
    expect(rowCells[0].nativeElement.textContent.trim()).toBe('John');
    expect(rowCells[1].nativeElement.textContent.trim()).toBe('25');
  });
});
