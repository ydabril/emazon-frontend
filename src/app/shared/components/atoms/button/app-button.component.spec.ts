import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BUTTON_ICON } from 'src/app/core/constants/button-icons';
import { AppButtonComponent } from 'src/app/shared/components/atoms/button/app-button.component';

describe('AppButtonComponent', () => {
  let component: AppButtonComponent;
  let fixture: ComponentFixture<AppButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set iconValue correctly on init', () => {
    component.icon = 'exampleIcon';
    component.ngOnInit();
    expect(component.iconValue).toBe(BUTTON_ICON[component.icon]);
  });

  it('should disable the button when disabled input is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(buttonElement.disabled).toBe(true);
  });

  it('should not display the icon when icon input is not provided', () => {
    component.icon = '';
    fixture.detectChanges();
    const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(imgElement).toBeNull();
  });

  it('should display the icon when icon input is provided', () => {
    component.icon = 'add';
    component.ngOnInit();
    fixture.detectChanges();
    const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(imgElement).toBeTruthy();
    expect(imgElement.src).toContain(BUTTON_ICON[component.icon]);
  });
});
