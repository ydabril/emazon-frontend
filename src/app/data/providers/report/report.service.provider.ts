import { Provider } from "@angular/core";
import { ReportService } from "src/app/application/services/report/report.service";

export const ReportServiceProvider: Provider = {
    provide: 'reportService',
    useClass: ReportService
  }