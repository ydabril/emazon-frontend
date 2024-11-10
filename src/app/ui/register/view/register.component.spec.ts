import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { RegisterViewComponent } from './register.component';
import { IUserService } from 'src/app/domain/interfaces/user.interface';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { UserServiceProvider } from 'src/app/data/providers/user/user.service.provider';
import { UserRequest } from 'src/app/data/network/requests/user.request';
import { EM_ICON } from 'src/app/core/constants/em-icons';


describe('RegisterViewComponent', () => {
  let component: RegisterViewComponent;
  let fixture: ComponentFixture<RegisterViewComponent>;
  let mockUserService: jest.Mocked<IUserService>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    mockUserService = {
      registerUser: jest.fn(),
    } as any;

    mockRouter = {
      navigate: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [RegisterViewComponent],
      providers: [
        UserServiceProvider,
        { provide: ProviderServices.userService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the navigation menu', () => {
    const initialExpandedState = component.isNavMenuExpanded;
    component.toggleNavMenu();
    expect(component.isNavMenuExpanded).toBe(!initialExpandedState);
  });

  it('should close the modal message', () => {
    component.showModalMessage = true;
    component.success = true;
    component.closeModalMessage();
    expect(component.showModalMessage).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should save a user and show success modal on success', () => {
    const userRequest: UserRequest = {
      firstName: 'John',
      lastName: 'Doe',
      documentNumber: '123456789',
      phoneNumber: '9876543210',
      birthdate: '1990-01-01',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const response: HttpResponse<any> = new HttpResponse({ body: null });
    mockUserService.registerUser.mockReturnValue(of(response));

    component.saveUser(userRequest);

    expect(mockUserService.registerUser).toHaveBeenCalledWith(userRequest);
    expect(component.openForm).toBe(false);
    expect(component.showModalMessage).toBe(true);
    expect(component.modalIcon).toBe(EM_ICON['success']);
    expect(component.modalTitle).toBe("Proceso existoso");
    expect(component.modalMessage).toBe("usuario registrado exitosamente");
  });

  it('should show error modal on save user failure', () => {
    const userRequest: UserRequest = {
      firstName: 'John',
      lastName: 'Doe',
      documentNumber: '123456789',
      phoneNumber: '9876543210',
      birthdate: '1990-01-01',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const errorResponse = new HttpErrorResponse({ error: { message: 'Error creating user' } });
    mockUserService.registerUser.mockReturnValue(throwError(() => errorResponse));

    component.saveUser(userRequest);

    expect(mockUserService.registerUser).toHaveBeenCalledWith(userRequest);
    expect(component.openForm).toBe(false);
    expect(component.showModalMessage).toBe(true);
    expect(component.modalIcon).toBe(EM_ICON['error']);
    expect(component.modalTitle).toBe("Algo salió mal");
    expect(component.modalMessage).toBe('Error creating user');
  });
});
