import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import * as jwt_decode from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class UtilsService {
  public _requestOnAction = new BehaviorSubject<boolean>(false);
  constructor(private router: Router) {}

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedToken: any = jwt_decode.jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    return decodedToken.exp < currentTime;
  }

  checkTokenExpiration(): void {
    if (this.isTokenExpired()) {
      this.logout();
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/landing']);
  }
}
