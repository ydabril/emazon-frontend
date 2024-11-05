import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UtilsService } from 'src/app/common/utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private _utils: UtilsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const requiredRole = route.data['role'];

    if (!token) {
      this.router.navigate(['/landing']);
      return false;
    }

    if (requiredRole && userRole !== requiredRole) {
      this.router.navigate(['/landing'], { queryParams: { showErrorModal: true, errorCode: 401 } });
      return false;
    }
    
    this._utils.checkTokenExpiration();

    return true;
  }
}
