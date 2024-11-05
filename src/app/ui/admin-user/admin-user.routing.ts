import { Routes } from '@angular/router';
import { AdminUserViewComponent } from './view/admin-user.component.';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';
import { ROLE } from 'src/app/core/constants/enums/roles.enum';


export const userRoute: Routes = [
  { 
    path: 'admin-user', 
    component: AdminUserViewComponent
  }
]
