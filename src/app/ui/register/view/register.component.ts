import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Component, Inject } from "@angular/core";
import { EM_ICON } from "src/app/core/constants/em-icons";
import { ProviderServices } from "src/app/core/constants/enums/provider.service.enum";
import { UserRequest } from "src/app/data/network/requests/user.request";
import { IUserService } from "src/app/domain/interfaces/user.interface";
import { RegisterOutputLogic } from "../model/register.model";
import { Router } from "@angular/router";

@Component({
  selector: 'register-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterViewComponent extends RegisterOutputLogic {
  showDragDrop: boolean = true;
  showFormArticle: boolean = true;

  constructor(
    private router: Router,
    @Inject(ProviderServices.userService) private _userService: IUserService
  ) {
    super();
  }

  toggleNavMenu() {
    this.isNavMenuExpanded = !this.isNavMenuExpanded;
  }

  closeModalMessage(): void  {
    this.showModalMessage = false;
    if(this.success) {
      this.router.navigate(['/login']);
    }
  }

  saveUser(userRequest: UserRequest): void  {
    this._userService.registerUser(userRequest).subscribe({
      next: (response: HttpResponse<unknown>) => this.showSuccessModal(response),
      error: (error: HttpErrorResponse) => this.showErrorModal(error)
    })
  }

  private showSuccessModal(response: HttpResponse<any>) {
    this.success = true;
    this.openForm = false;
    this.showModalMessage = true;
    this.modalIcon = EM_ICON['success']
    this.modalTitle = "Proceso existoso";
    this.modalMessage = "usuario registrado exitosamente";
  }

  private showErrorModal(error: HttpErrorResponse) {
    this.openForm = false;
    this.showModalMessage = true;
    this.modalIcon = EM_ICON['error'];
    this.modalTitle = "Algo salió mal";
    this.modalMessage = error.error.message;
  }
}