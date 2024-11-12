import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe('UtilsService', () => {
  let service: UtilsService;
  let routerMock: { navigate: jest.Mock };
  
  // Mock para localStorage
  let localStorageMock: Storage;

  beforeEach(() => {
    routerMock = { navigate: jest.fn() };
    // Simulamos el localStorage
    localStorageMock = ({} as unknown) as Storage;
    global.localStorage = localStorageMock;

    service = new UtilsService(routerMock as unknown as Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false if there is no token in localStorage', () => {
    // Simulamos que getItem devuelve null
    localStorageMock.getItem = jest.fn().mockReturnValue(null);

    const result = service.isTokenExpired();
    expect(result).toBe(false);
  });


  it('should return false if the token is not expired', () => {
    const validToken = 'valid_token_example';
    const currentTime = Math.floor(Date.now() / 1000);
    const decodedToken = { exp: currentTime + 10000 }; // valid token
    localStorageMock.getItem = jest.fn().mockReturnValue(validToken);
    (jwt_decode.jwtDecode as jest.Mock).mockReturnValue(decodedToken);

    const result = service.isTokenExpired();
    expect(result).toBe(false);
  });

  it('should call logout and navigate to / when token is expired', () => {
    jest.spyOn(service, 'isTokenExpired').mockReturnValue(true);
    const logoutSpy = jest.spyOn(service, 'logout');

    service.checkTokenExpiration();

    expect(logoutSpy).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});
