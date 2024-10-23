import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DirectiveModule } from "../core/directives/directive.module";
import { AppButtonComponent } from "./components/atoms/button/app-button.component";
import { DropdownTableComponent } from "./components/atoms/dropdown-table/dropdown-table.component";
import { AppInputComponent } from "./components/atoms/input/app-input.component";
import { PaginationComponent } from "./components/atoms/pagination/pagination.component";
import { TextareaComponent } from "./components/atoms/textarea/textarea.component";
import { DataTableComponent } from "./components/molecules/datatable/data-table.component";
import { FormComponent } from "./components/molecules/form/form.component.";
import { HeaderComponent } from "./components/molecules/header/header.component";
import { NavbarComponent } from "./components/molecules/navbar/navbar.component";
import { PaginationBarComponent } from "./components/molecules/pagination-bar/pagination-bar.component";
import { DasboardComponent } from "./components/organisms/dashboard/dashboard.component";
import { ModalCategoryComponent } from "./components/organisms/modal_category/modal.component";
import { ModalMessageComponent } from "./components/organisms/modal_message/modal-message.component";
import { TableComponent } from "./components/organisms/table/table.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    AppInputComponent,
    TextareaComponent,
    AppButtonComponent,
    NavbarComponent,
    HeaderComponent,
    DasboardComponent,
    FormComponent,
    ModalCategoryComponent,
    DropdownTableComponent,
    PaginationBarComponent,
    PaginationComponent,
    TableComponent,
    DataTableComponent,
    ModalMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectiveModule,
    RouterModule
  ],
  exports: [
    AppInputComponent,
    TextareaComponent,
    AppButtonComponent,
    NavbarComponent,
    HeaderComponent,
    DasboardComponent,
    FormComponent,
    ModalCategoryComponent,
    DropdownTableComponent,
    PaginationBarComponent,
    PaginationComponent,
    TableComponent,
    DataTableComponent,
    ModalMessageComponent
  ]
})
export class SharedModule { }
