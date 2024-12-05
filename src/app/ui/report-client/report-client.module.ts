import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from 'src/app/core/directives/directive.module';
import { ReportServiceProvider } from 'src/app/data/providers/report/report.service.provider';
import { SharedModule } from 'src/app/shared/shared.module';
import { reportClientRoute } from './report-client.routing';
import { ReportClientViewComponent } from './view/report-client.component';

@NgModule({
  declarations: [ReportClientViewComponent],
  imports: [
    RouterModule.forChild(reportClientRoute),
    SharedModule,
    CommonModule,
    DirectiveModule
  ],
  providers: [
    ReportServiceProvider
  ],
})
export class ReportClientModule {}
