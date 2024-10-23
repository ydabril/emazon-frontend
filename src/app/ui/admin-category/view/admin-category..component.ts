import { Component, Inject, OnInit } from '@angular/core';
import { ProvidersWebApp } from 'src/app/core/constants/enums/providers.enum';
import { AdminCategoryInputLogic, AdminCategoryOutputLogic } from './model/admin-category.model';
import { CategpryRequest } from 'src/app/data/network/requests/category.request';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';

@Component({
  selector: 'admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryViewComponent extends AdminCategoryOutputLogic {
  headers: string[] = ['ID', 'Nombre', 'Descripción'];

  constructor(
    @Inject(ProvidersWebApp.adminCategoryPresenter)
    private _presenter: AdminCategoryInputLogic
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

  closeFormCategory(value: boolean): void {
    this.openForm = value
  }

  closeModalMessage(): void  {
    this.showModalMessage = false;
  }

  getCategorie(paginationRequest: PaginationRequest) {
    this.paginationRequest = paginationRequest;
    this._presenter.getCategories(paginationRequest, this.page);
  }
  
  saveCategory(categoryRequest: CategpryRequest) {
    this._presenter.createCategory(categoryRequest);
  }

  nextPage(pageValue: number) {
    console.log(pageValue);
    
    this.page = pageValue;
    this.getCategorie(this.paginationRequest); 
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.openFormCategory();
    }
  }
}
