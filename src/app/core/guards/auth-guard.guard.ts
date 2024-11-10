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
    const userRole = localStorage.getItem('role') as string;
    const requiredRoles = route.data['roles'] as Array<string>;

    if (!token) {
      this.router.navigate(['/landing']);
      return false;
    }

    this._utils.checkTokenExpiration();
    
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      this.router.navigate(['/landing'], { queryParams: { showErrorModal: true, errorCode: 401 } });
      return false;
    }

    return true;
  }
}