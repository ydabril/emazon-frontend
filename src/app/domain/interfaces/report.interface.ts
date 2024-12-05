import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ReportResponse } from "src/app/data/network/responses/report.reponse";

export interface IReportService {
    getReports(): Observable<HttpResponse<ReportResponse[]>>
    getReportClient(email: string): Observable<HttpResponse<ReportResponse[]>> 
}