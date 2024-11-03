import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { EM_ICON } from 'src/app/core/constants/em-icons';
import { AdminUserViewComponent } from './admin-user.component.';
import { IUserService } from 'src/app/domain/interfaces/user.interface';
import { UserServiceProvider } from 'src/app/data/providers/user/user.service.provider';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { UserRequest } from 'src/app/data/network/requests/user.request';

describe('AdminUserViewComponent', () => {
  let component: AdminUserViewComponent;
  let fixture: ComponentFixture<AdminUserViewComponent>;
  let mockUserService: jest.Mocked<IUserService>;

  beforeEach(async () => {
    mockUserService = {
      createAuxUser: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [AdminUserViewComponent],
      imports: [HttpClientTestingModule],
      providers: [
        UserServiceProvider,
        { provide: ProviderServices.userService, useValue: mockUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUserViewComponent);
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

  it('should open the user form', () => {
    component.openFormUser();
    expect(component.openForm).toBe(true);
  });

  it('should close the user form', () => {
    component.closeFormUser(false);
    expect(component.openForm).toBe(false);
  });

  it('should close the modal message', () => {
    component.showModalMessage = true;
    component.closeModalMessage();
    expect(component.showModalMessage).toBe(false);
  });

  it('should save a user and show success modal on success', () => {
    const userRequest: UserRequest = {
      firstName: 'Yojhan',
      lastName: 'Abril',
      documentNumber: '100345220511',
      phoneNumber: '1234567890',
      birthdate: '2000-09-01',
      email: 'yojhanabrilperez22@gmail.com',
      password: '123456789',
    };

    const response: HttpResponse<any> = new HttpResponse({ body: null });
    mockUserService.createAuxUser.mockReturnValue(of(response));

    component.saveUser(userRequest);

    expect(mockUserService.createAuxUser).toHaveBeenCalledWith(userRequest);
    expect(component.openForm).toBe(false);
    expect(component.showModalMessage).toBe(true);
    expect(component.modalIcon).toBe(EM_ICON['success']);
    expect(component.modalTitle).toBe("Proceso existoso");
    expect(component.modalMessage).toBe("usuario auxiliar bodega creado correctamente");
  });

  it('should show error modal on save user failure', () => {
    const userRequest: UserRequest = {
      firstName: 'Yojhan',
      lastName: 'Abril',
      documentNumber: '100345220511',
      phoneNumber: '1234567890',
      birthdate: '2000-09-01',
      email: 'yojhanabrilperez22@gmail.com',
      password: '123456789',
    };

    const errorResponse = new HttpErrorResponse({ error: { message: 'Error creating user' } });
    mockUserService.createAuxUser.mockReturnValue(throwError(() => errorResponse));

    component.saveUser(userRequest);

    expect(mockUserService.createAuxUser).toHaveBeenCalledWith(userRequest);
    expect(component.openForm).toBe(false);
    expect(component.showModalMessage).toBe(true);
    expect(component.modalIcon).toBe(EM_ICON['error']);
    expect(component.modalTitle).toBe("Algo salió mal");
    expect(component.modalMessage).toBe('Error creating user');
  });
});
