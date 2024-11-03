import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { UserRequest } from 'src/app/data/network/requests/user.request';
import { environment } from 'src/environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create an auxiliary user and return a response', () => {
    const userRequest: UserRequest = {
      firstName: 'Yojhan',
      lastName: 'Abril',
      documentNumber: '100345220511',
      phoneNumber: '1234567890',
      birthdate: '2000-09-01',
      email: 'yojhanabrilperez22@gmail.com',
      password: '123456789',
    };

    service.createAuxUser(userRequest).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response.status).toBe(200);
    });

    const req = httpMock.expectOne(`${environment.API_URL_USER}/user/create-aux-user`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userRequest);

    req.flush(null, { status: 200, statusText: 'OK' });
  });

  it('should handle error response', () => {
    const userRequest: UserRequest = {
      firstName: 'Yojhan',
      lastName: 'Abril',
      documentNumber: '100345220511',
      phoneNumber: '1234567890',
      birthdate: '2000-09-01',
      email: 'yojhanabrilperez22@gmail.com',
      password: '123456789',
    };

    service.createAuxUser(userRequest).subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
      },
    });

    const req = httpMock.expectOne(`${environment.API_URL_USER}/user/create-aux-user`);
    expect(req.request.method).toBe('POST');

    req.flush('Error creating user', { status: 404, statusText: 'Not Found' });
  });
});
