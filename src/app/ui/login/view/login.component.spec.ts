import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { LoginViewComponent } from './login.component';
import { IUserService } from 'src/app/domain/interfaces/user.interface';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { UserServiceProvider } from 'src/app/data/providers/user/user.service.provider';
import { UserLoginRequest } from 'src/app/data/network/requests/user-login.request';
import { EM_ICON } from 'src/app/core/constants/em-icons';


jest.mock('jwt-decode');

describe('LoginViewComponent', () => {
  let component: LoginViewComponent;
  let fixture: ComponentFixture<LoginViewComponent>;
  let mockUserService: jest.Mocked<IUserService>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    mockUserService = {
      loginUser: jest.fn(),
    } as any;

    mockRouter = {
      navigate: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [LoginViewComponent],
      imports: [HttpClientTestingModule],
      providers: [
        UserServiceProvider,
        { provide: ProviderServices.userService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the navigation menu', () => {
    const initialExpandedState = component.isNavMenuExpanded;
    component.toggleNavMenu();
    expect(component.isNavMenuExpanded).toBe(!initialExpandedState);
  });

  it('should open the user form', () => {
    component.openFormUser();
    expect(component.openForm).toBe(true);
  });

  it('should close the user form', () => {
    component.closeFormUser(false);
    expect(component.openForm).toBe(false);
  });

  it('should close the modal message and navigate if success', () => {
    component.success = true;
    component.showModalMessage = true;

    component.closeModalMessage();

    expect(component.showModalMessage).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should close the modal message without navigating if not successful', () => {
    component.success = false;
    component.showModalMessage = true;

    component.closeModalMessage();

    expect(component.showModalMessage).toBe(false);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should log in user and show success modal on success', () => {
    const userRequest: UserLoginRequest = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockToken = 'mockToken';
    const response: HttpResponse<any> = new HttpResponse({
      body: { token: mockToken },
    });

    (jwt_decode.jwtDecode as jest.Mock).mockReturnValue({
      authorities: 'user',
      name: 'Test User',
    });
    mockUserService.loginUser.mockReturnValue(of(response));

    component.loginUser(userRequest);

    expect(mockUserService.loginUser).toHaveBeenCalledWith(userRequest);
    expect(component.openForm).toBe(false);
    expect(component.showModalMessage).toBe(true);
    expect(component.modalIcon).toBe(EM_ICON['success']);
    expect(component.modalTitle).toBe('Proceso existoso');
    expect(component.modalMessage).toBe('usuario logueado correctamente');
    expect(localStorage.getItem('token')).toBe(mockToken);
    expect(localStorage.getItem('role')).toBe('user');
    expect(localStorage.getItem('userName')).toBe('Test User');
  });

  it('should show error modal on login failure', () => {
    const userRequest: UserLoginRequest = {
      email: 'test@example.com',
      password: 'password123',
    };

    const errorResponse = new HttpErrorResponse({
      error: { message: 'Login failed' },
    });

    mockUserService.loginUser.mockReturnValue(throwError(() => errorResponse));

    component.loginUser(userRequest);

    expect(mockUserService.loginUser).toHaveBeenCalledWith(userRequest);
    expect(component.openForm).toBe(false);
    expect(component.showModalMessage).toBe(true);
    expect(component.modalIcon).toBe(EM_ICON['error']);
    expect(component.modalTitle).toBe('Algo salió mal');
    expect(component.modalMessage).toBe('Login failed');
  });
});
