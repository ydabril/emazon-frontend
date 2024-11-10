import { Routes } from '@angular/router';
import { AdminArticleViewComponent } from './view/admin-article.component';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';
import { ROLE } from 'src/app/core/constants/enums/roles.enum';


export const articleRoute: Routes = [
  { 
    path: 'admin-article', 
    component: AdminArticleViewComponent, 
    canActivate: [AuthGuard], 
    data: { roles: [ROLE.admin, ROLE.aux] } 
  }
]
