import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { ReportResponse } from 'src/app/data/network/responses/report.reponse';
import { IReportService } from 'src/app/domain/interfaces/report.interface';
import { ReportOutputLogic } from '../model/report.model';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportViewComponent extends ReportOutputLogic implements OnInit {
  headers: string[] = ['ID', 'Nombre', 'Descripción'];
  showDragDrop: boolean = true;
  showFormArticle: boolean = true;
  userRole: string | null = null;
  selectedImage!: File;

  constructor(
    @Inject(ProviderServices.reportService) private _reportService: IReportService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getReportList(this.paginationRequest);
  }

  getReportList(paginationRequest: PaginationRequest): void {
    this._reportService.getReports().subscribe({
      next: (response: HttpResponse<ReportResponse[]>) => this.reportList = response.body as ReportResponse[],
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }
}
