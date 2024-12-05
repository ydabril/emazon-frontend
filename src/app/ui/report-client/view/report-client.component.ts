import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { ReportResponse } from 'src/app/data/network/responses/report.reponse';
import { IReportService } from 'src/app/domain/interfaces/report.interface';
import { ReportClientOutputLogic } from '../model/report.-client.model';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'report-client',
  templateUrl: './report-client.component.html',
  styleUrls: ['./report-client.component.scss'],
})
export class ReportClientViewComponent extends ReportClientOutputLogic implements OnInit {
  headers: string[] = ['ID', 'Nombre', 'Descripción'];
  showDragDrop: boolean = true;
  showFormArticle: boolean = true;
  userRole: string | null = null;
  selectedImage!: File;
  email!: string

  constructor(
    @Inject(ProviderServices.reportService) private _reportService: IReportService,
  ) {
    super();
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const decodedToken: any = jwt_decode.jwtDecode(token as string)
    this.email = decodedToken?.sub;

    this.getReportList(this.paginationRequest);
  }

  getReportList(paginationRequest: PaginationRequest): void {
    this._reportService.getReportClient(this.email).subscribe({
      next: (response: HttpResponse<ReportResponse[]>) => this.reportList = response.body as ReportResponse[],
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }
}
