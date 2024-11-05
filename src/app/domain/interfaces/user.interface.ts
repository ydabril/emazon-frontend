import { Observable } from "rxjs";
import { UserLoginRequest } from "src/app/data/network/requests/user-login.request";
import { UserRequest } from "src/app/data/network/requests/user.request";

export interface IUserService {
    createAuxUser(userRequest: UserRequest): Observable<any>
    loginUser(loginRequest: UserLoginRequest): Observable<any>
}