import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { NavbarComponent } from 'src/app/shared/components/molecules/navbar/navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update navMenuExpamded on changes of isNavMenuExpanded input', () => {
    component.isNavMenuExpanded = true;

    component.ngOnChanges({
      isNavMenuExpanded: new SimpleChange(null, component.isNavMenuExpanded, false)
    });

    expect(component.navMenuExpamded).toBe(true);

    component.isNavMenuExpanded = false;
    component.ngOnChanges({
      isNavMenuExpanded: new SimpleChange(true, component.isNavMenuExpanded, false)
    });

    expect(component.navMenuExpamded).toBe(false);
  });

  it('should have the correct config icon', () => {
    expect(component.configIcon).toBe('/assets/icons/config-icon.svg'); // Replace with actual path in EM_ICON
  });
});
