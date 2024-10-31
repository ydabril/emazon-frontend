import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from 'src/app/shared/components/molecules/header/header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isNavMenuExpanded when toggleNavMenu is called', () => {
    expect(component.isNavMenuExpanded).toBe(false);

    component.toggleNavMenu();
    expect(component.isNavMenuExpanded).toBe(true);

    component.toggleNavMenu();
    expect(component.isNavMenuExpanded).toBe(false);
  });

  it('should emit toggleMenuValue when toggleNavMenu is called', () => {
    const emitSpy = jest.spyOn(component.toggleMenuValue, 'emit');

    component.toggleNavMenu();
    expect(emitSpy).toHaveBeenCalledWith(true);

    component.toggleNavMenu();
    expect(emitSpy).toHaveBeenCalledWith(false);
  });
});
