import { Routes } from '@angular/router';
import { ROLE } from 'src/app/core/constants/enums/roles.enum';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';
import { ReportViewComponent } from './view/report.component';


export const reportRoute: Routes = [
  { 
    path: 'report', 
    component: ReportViewComponent, 
    canActivate: [AuthGuard], 
    data: { roles: [ROLE.admin] } 
  }
]
