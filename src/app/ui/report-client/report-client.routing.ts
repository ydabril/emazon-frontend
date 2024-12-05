import { Routes } from '@angular/router';
import { ROLE } from 'src/app/core/constants/enums/roles.enum';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';
import { ReportClientViewComponent } from './view/report-client.component';


export const reportClientRoute: Routes = [
  { 
    path: 'report-client', 
    component: ReportClientViewComponent, 
    canActivate: [AuthGuard], 
    data: { roles: [ROLE.client] } 
  }
]
