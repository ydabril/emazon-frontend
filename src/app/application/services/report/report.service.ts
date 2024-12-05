import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ReportResponse } from "src/app/data/network/responses/report.reponse";
import { IReportService } from "src/app/domain/interfaces/report.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class ReportService implements  IReportService {
  constructor(private _http: HttpClient) { }

  public getReports(): Observable<HttpResponse<ReportResponse[]>> {
    return this._http.get<ReportResponse[]>(`${environment.API_URL_REPORT}/report`, { observe: 'response' });
  }

  public getReportClient(email: string): Observable<HttpResponse<ReportResponse[]>> {
    return this._http.get<ReportResponse[]>(`${environment.API_URL_REPORT}/report/client/${email}`, { observe: 'response' });
  }
}