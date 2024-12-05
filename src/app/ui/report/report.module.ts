import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from 'src/app/core/directives/directive.module';
import { ReportServiceProvider } from 'src/app/data/providers/report/report.service.provider';
import { SharedModule } from 'src/app/shared/shared.module';
import { reportRoute } from './report.routing';
import { ReportViewComponent } from './view/report.component';

@NgModule({
  declarations: [ReportViewComponent],
  imports: [
    RouterModule.forChild(reportRoute),
    SharedModule,
    CommonModule,
    DirectiveModule
  ],
  providers: [
    ReportServiceProvider
  ],
})
export class ReportModule {}
