import { Component, Inject, OnInit } from '@angular/core';
import { AdminArticleOutputLogic } from '../model/admin-article.model';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { ICategoryService } from 'src/app/domain/interfaces/category.interface';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Category, CategoryResponse } from 'src/app/data/network/responses/category.response';
import { PaginationRequest } from 'src/app/data/network/requests/pagination.request';
import { IBrandService } from 'src/app/domain/interfaces/brand.interface';
import { Brand, BrandResponse } from 'src/app/data/network/responses/brand.response';
import { IArticleService } from 'src/app/domain/interfaces/article.interface';
import { ArticleRequest } from 'src/app/data/network/requests/articleRequest';
import { EM_ICON } from 'src/app/core/constants/em-icons';

@Component({
  selector: 'admin-brand',
  templateUrl: './admin-article.component.html',
  styleUrls: ['./admin-article.component.scss'],
})
export class AdminArticleViewComponent extends AdminArticleOutputLogic implements OnInit {
  headers: string[] = ['ID', 'Nombre', 'Descripción'];
  showDragDrop: boolean = true;
  showFormArticle: boolean = true;

  constructor(
    @Inject(ProviderServices.categoryService) private _categoryService: ICategoryService,
    @Inject(ProviderServices.brandService) private _brandService: IBrandService,
    @Inject(ProviderServices.articleService) private _articleService: IArticleService
  ) {
    super();
  }

  ngOnInit(): void {
    this.paginationRequest = {
      sortDirection: 'ASC',
      size: 50
    }
    this.page = 0

    this.getCategoryList(this.paginationRequest, this.page);
    this.getBrandList(this.paginationRequest, this.page);
  }

  getCategoryList(paginationRequest: PaginationRequest, page: number): void {
    this._categoryService.getCategories(paginationRequest, page).subscribe({
      next: (response: HttpResponse<CategoryResponse>) => this.listDataCategory = response.body?.list as Array<Category>,
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }

  getBrandList(paginationRequest: PaginationRequest, page: number): void {
    this._brandService.getBrands(paginationRequest, page).subscribe({
      next: (response: HttpResponse<BrandResponse>) => this.listDataBrand = response.body?.list as Array<Brand>,
      error: (error: HttpErrorResponse) => console.log(error)
    })
  }

  saveArticle(articleRequest: ArticleRequest): void  {
    this._articleService.createArticle(articleRequest).subscribe({
      next: (response: HttpResponse<any>) => this.showSuccessModal(response),
      error: (error: HttpErrorResponse) => this.showErrorModal(error)
    })
  }

  private showSuccessModal(response: HttpResponse<any>) {
    this.openForm = false;
    this.showModalMessage = true;
    this.modalIcon = EM_ICON['success'];
    this.modalTitle = "Proceso existoso";
    this.modalMessage = "Articulo creado correctamente";
  }

  private showErrorModal(error: HttpErrorResponse) {
    this.openForm = false;
    this.showModalMessage = true;
    this.modalIcon = EM_ICON['error'];
    this.modalTitle = "Algo salió mal";
    this.modalMessage = error.error.message;
  }

  toggleNavMenu() {
    this.isNavMenuExpanded = !this.isNavMenuExpanded;
  }

  openFormArticle(): void {
    this.openForm = true
  }

  closeFormArticle(value: boolean): void {
    this.openForm = value
  }

  closeModalMessage(): void  {
    this.showModalMessage = false;
  }
}
