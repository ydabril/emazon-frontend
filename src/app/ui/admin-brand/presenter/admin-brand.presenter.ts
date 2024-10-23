import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { EM_ICON } from 'src/app/core/constants/em-icons';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { BrandRequest } from 'src/app/data/network/requests/brandRequest';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { IBrandService } from 'src/app/domain/interfaces/brand.interface';
import { AdminBrandInputLogic, AdminBrandOutputLogic } from '../view/model/admin-brand.model';
import { Brand, BrandResponse } from 'src/app/data/network/responses/brand.response';

@Injectable()
export class AdminBrandPresenter implements AdminBrandInputLogic {
  private _view!: AdminBrandOutputLogic;

  constructor(
    @Inject(ProviderServices.brandService) private _brandService: IBrandService
  ) {}

  public setView(component: AdminBrandOutputLogic): void {
    this._view = component;
  }

  public createBrand(brandRequest: BrandRequest) {
    this._brandService.createBrand(brandRequest).subscribe({
      next: (response: HttpResponse<any>) => this.showSuccessModal(response),
      error: (error: HttpErrorResponse) => this.showErrorModal(error)
    })
  }

  private showSuccessModal(response: HttpResponse<any>) {
    this._view.openForm = false;
    this._view.showModalMessage = true;
    this._view.modalIcon = EM_ICON['success'];
    this._view.modalTitle = "Proceso existoso";
    this._view.modalMessage = "Categoria creada correctamente";
  }

  private showErrorModal(error: HttpErrorResponse) {
    this._view.openForm = false;
    this._view.showModalMessage = true;
    this._view.modalIcon = EM_ICON['error'];
    this._view.modalTitle = "Algo salió mal";
    this._view.modalMessage = error.error.message;
  }

  public getBrands(paginationRequest: PaginationRequest, page: number): void {
    console.log(paginationRequest);
    
    this._brandService.getBrands(paginationRequest, page).subscribe({
      next: (response: HttpResponse<BrandResponse>) => this.assignBrandList(response.body as BrandResponse),
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }

  private assignBrandList(categoryRespnse: BrandResponse): void {
    this._view.totalPages = categoryRespnse.totalPages;
    this._view.currentPage = categoryRespnse.currentPage;
    this._view.hasNextPage = categoryRespnse.hasNextPage;
    this._view.hasPreviousPage = categoryRespnse.hasPreviousPage;
    
    let categoryList: Array<Brand> = categoryRespnse.list;
    this._view.tableDataBrand = categoryList;   
  }

}
