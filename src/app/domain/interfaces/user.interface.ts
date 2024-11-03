import { Observable } from "rxjs";
import { UserRequest } from "src/app/data/network/requests/user.request";

export interface IUserService {
    createAuxUser(userRequest: UserRequest): Observable<any>
}