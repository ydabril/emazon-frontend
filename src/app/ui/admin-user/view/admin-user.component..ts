import { Component, Inject } from '@angular/core';
import { AdminUserOutputLogic } from '../model/admin-user.model';
import { ProviderServices } from 'src/app/core/constants/enums/provider.service.enum';
import { IUserService } from 'src/app/domain/interfaces/user.interface';
import { UserRequest } from 'src/app/data/network/requests/user.request';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EM_ICON } from 'src/app/core/constants/em-icons';

@Component({
  selector: 'admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
})
export class AdminUserViewComponent extends AdminUserOutputLogic {
  headers: string[] = ['ID', 'Nombre', 'Descripción'];
  showDragDrop: boolean = true;
  showFormArticle: boolean = true;

  constructor(
    @Inject(ProviderServices.userService) private _userService: IUserService
  ) {
    super();
  }

  toggleNavMenu() {
    this.isNavMenuExpanded = !this.isNavMenuExpanded;
  }

  openFormUser(): void {
    this.openForm = true
  }

  closeFormUser(value: boolean): void {
    this.openForm = value
  }

  closeModalMessage(): void  {
    this.showModalMessage = false;
  }

  saveUser(userRequest: UserRequest): void  {
    this._userService.createAuxUser(userRequest).subscribe({
      next: (response: HttpResponse<unknown>) => this.showSuccessModal(response),
      error: (error: HttpErrorResponse) => this.showErrorModal(error)
    })
  }

  private showSuccessModal(response: HttpResponse<any>) {
    this.openForm = false;
    this.showModalMessage = true;
    this.modalIcon = EM_ICON['success']
    this.modalTitle = "Proceso existoso";
    this.modalMessage = "usuario auxiliar bodega creado correctamente";
  }

  private showErrorModal(error: HttpErrorResponse) {
    this.openForm = false;
    this.showModalMessage = true;
    this.modalIcon = EM_ICON['error'];
    this.modalTitle = "Algo salió mal";
    this.modalMessage = error.error.message;
  }
}
