import { Routes } from '@angular/router';
import { adminBrandViewComponent } from './view/admin-brand.component.';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';
import { ROLE } from 'src/app/core/constants/enums/roles.enum';


export const brandRoute: Routes = [
  { 
    path: 'admin-brand', 
    component: adminBrandViewComponent, 
    canActivate: [AuthGuard], 
    data: { role: ROLE.admin} 
  }
]
