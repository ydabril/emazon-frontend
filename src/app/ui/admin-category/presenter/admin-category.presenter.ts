import { Inject, Injectable } from '@angular/core';
import {
  AdminCategoryInputLogic,
  AdminCategoryOutputLogic
} from '../view/model/admin-category.model';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { ICategoryService } from 'src/app/domain/interfaces/category.interface';
import { CategpryRequest } from 'src/app/data/network/requests/category.request';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Category, CategoryResponse } from 'src/app/data/network/responses/category.response';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { EM_ICON } from 'src/app/core/constants/em-icons';

@Injectable()
export class AdminCategoryPresenter implements AdminCategoryInputLogic {
  private _view!: AdminCategoryOutputLogic;

  constructor(
    @Inject(ProviderServices.categoryService) private _categoryService: ICategoryService
  ) {}

  public setView(component: AdminCategoryOutputLogic): void {
    this._view = component;
  }

  public createCategory(categoryRequest: CategpryRequest) {
    console.log(categoryRequest);
    this._categoryService.createCategory(categoryRequest).subscribe({
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

  public getCategories(paginationRequest: PaginationRequest, page: number): void {
    console.log(paginationRequest);
    
    this._categoryService.getCategories(paginationRequest, page).subscribe({
      next: (response: HttpResponse<CategoryResponse>) => this.assignCategoryList(response.body as CategoryResponse),
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }

  private assignCategoryList(categoryRespnse: CategoryResponse): void {
    this._view.totalPages = categoryRespnse.totalPages;
    this._view.currentPage = categoryRespnse.currentPage;
    this._view.hasNextPage = categoryRespnse.hasNextPage;
    this._view.hasPreviousPage = categoryRespnse.hasPreviousPage;
    
    let categoryList: Array<Category> = categoryRespnse.list;
    this._view.tableDataCategory = categoryList;
    console.log(this._view.tableDataCategory);
    
  }

}
