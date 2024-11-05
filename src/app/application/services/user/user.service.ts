import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserRequest } from "src/app/data/network/requests/user.request";
import { IUserService } from "src/app/domain/interfaces/user.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class UserService implements IUserService {
  constructor(private _http: HttpClient) { }

  public createAuxUser(userRequest: UserRequest) {
    return this._http.post<unknown>(`${environment.API_URL_USER}/user/create-aux-user`, userRequest, { observe: 'response' });
  }

  public loginUser(userRequest: UserRequest) {
    return this._http.post<unknown>(`${environment.API_URL_USER}/auth/login`, userRequest, { observe: 'response' });
  }
}