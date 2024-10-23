import { Component, Inject } from '@angular/core';
import { ProvidersWebApp } from 'src/app/core/constants/enums/providers.enum';
import { BrandRequest } from 'src/app/data/network/requests/brandRequest';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { AdminBrandInputLogic, AdminBrandOutputLogic } from './model/admin-brand.model';

@Component({
  selector: 'admin-brand',
  templateUrl: './admin-brand.component.html',
  styleUrls: ['./admin-brand.component.scss'],
})
export class adminBrandViewComponent extends AdminBrandOutputLogic {
  headers: string[] = ['ID', 'Nombre', 'Descripción'];

  constructor(
    @Inject(ProvidersWebApp.adminBrandPresenter)
    private _presenter: AdminBrandInputLogic
  ) {
    super();
    this._presenter.setView(this);
  }

  toggleNavMenu() {
    this.isNavMenuExpanded = !this.isNavMenuExpanded;
  }

  openFormCategory(): void {
    this.openForm = true
  }

  closeFormBrand(value: boolean): void {
    this.openForm = value
  }

  closeModalMessage(): void  {
    this.showModalMessage = false;
  }

  getBrands(paginationRequest: PaginationRequest) {
    this.paginationRequest = paginationRequest;
    this._presenter.getBrands(paginationRequest, this.page);
  }
  
  saveCategory(brandRequest: BrandRequest) {
    this._presenter.createBrand(brandRequest);
  }

  nextPage(pageValue: number) {   
    this.page = pageValue;
    this.getBrands(this.paginationRequest); 
  }
}
