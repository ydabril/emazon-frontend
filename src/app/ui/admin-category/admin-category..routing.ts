import { Routes } from '@angular/router';
import { AdminCategoryViewComponent } from './view/admin-category..component';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';
import { ROLE } from 'src/app/core/constants/enums/roles.enum';

export const categoryRoute: Routes = [
  { 
    path: 'admin-category', 
    component: AdminCategoryViewComponent, 
    canActivate: [AuthGuard] , 
    data: { roles: [ROLE.admin] } 
  }
]
