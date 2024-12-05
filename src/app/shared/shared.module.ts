import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppInputComponent } from "./components/atoms/input/app-input.component";
import { TextareaComponent } from "./components/atoms/textarea/textarea.component";
import { AppButtonComponent } from "./components/atoms/button/app-button.component";
import { NavbarComponent } from "./components/molecules/navbar/navbar.component";
import { HeaderComponent } from "./components/molecules/header/header.component";
import { DasboardComponent } from "./components/organisms/dashboard/dashboard.component";
import { FormComponent } from "./components/molecules/form/form.component.";
import { ModalCategoryComponent } from "./components/organisms/modal_form/modal.component";
import { DropdownTableComponent } from "./components/atoms/dropdown-table/dropdown-table.component";
import { PaginationBarComponent } from "./components/molecules/pagination-bar/pagination-bar.component";
import { PaginationComponent } from "./components/atoms/pagination/pagination.component";
import { TableComponent } from "./components/organisms/table/table.component";
import { DataTableComponent } from "./components/molecules/datatable/data-table.component";
import { ModalMessageComponent } from "./components/organisms/modal_message/modal-message.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DirectiveModule } from "../core/directives/directive.module";
import { RouterModule } from "@angular/router";
import { DragDropComponent } from "./components/molecules/drag-drop/drag-drop.component";
import { FormArticleComponent } from "./components/molecules/form_article/form-article.component.";
import { DropdownSelectComponent } from "./components/atoms/dropdown-select/dropdown-select.component";
import { ModalArticleComponent } from "./components/organisms/modal_form_article/modal-article.component";
import { ArticleCardComponent } from "./components/molecules/article-cad/article-card.component";
import { ArticleListComponent } from "./components/organisms/article-list/article-list.component";
import { ArticleSortComponent } from "./components/molecules/article-sort/article-sort.component";
import { FormUserComponent } from "./components/molecules/form-user/form-user.component.";
import { FormLoginComponent } from "./components/molecules/form-login/form-login.component.";
import { FormSupplyComponent } from "./components/molecules/form-supply/form-supply.component.";
import { HeaderPageComponent } from "./components/organisms/header-page/header-page.component";
import { CartListComponent } from "./components/molecules/cart-list/cart-list.component";
import { LoaderComponent } from "./components/atoms/loader/loader.component";


@NgModule({
  declarations: [
    LoaderComponent,
    AppInputComponent,
    TextareaComponent,
    AppButtonComponent,
    NavbarComponent,
    CartListComponent,
    HeaderComponent,
    HeaderPageComponent,
    DasboardComponent,
    FormComponent,
    DragDropComponent,
    FormArticleComponent,
    FormUserComponent,
    FormLoginComponent,
    FormSupplyComponent,
    DropdownSelectComponent,
    ModalCategoryComponent,
    ModalArticleComponent,
    DropdownTableComponent,
    PaginationBarComponent,
    PaginationComponent,
    TableComponent,
    DataTableComponent,
    ModalMessageComponent,
    ArticleSortComponent,
    ArticleCardComponent,
    ArticleListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectiveModule,
    RouterModule
  ],
  exports: [
    LoaderComponent,
    AppInputComponent,
    TextareaComponent,
    AppButtonComponent,
    NavbarComponent,
    CartListComponent,
    HeaderComponent,
    HeaderPageComponent,
    DasboardComponent,
    FormComponent,
    DragDropComponent,
    FormArticleComponent,
    FormUserComponent,
    FormLoginComponent,
    FormSupplyComponent,
    DropdownSelectComponent,
    ModalCategoryComponent,
    ModalArticleComponent,
    DropdownTableComponent,
    PaginationBarComponent,
    PaginationComponent,
    TableComponent,
    DataTableComponent,
    ModalMessageComponent,
    ArticleSortComponent,
    ArticleCardComponent,
    ArticleListComponent
  ]
})
export class SharedModule { }
