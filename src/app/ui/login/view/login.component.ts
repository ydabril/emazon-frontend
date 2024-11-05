import { Component, Inject, OnInit } from "@angular/core";
import { LoginOutputLogic } from "../model/login.model";
import { ProviderServices } from "src/app/core/constants/enums/provider.service.enum";
import { IUserService } from "src/app/domain/interfaces/user.interface";
import { UserLoginRequest } from "src/app/data/network/requests/user-login.request";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { EM_ICON } from "src/app/core/constants/em-icons";
import * as jwt_decode from "jwt-decode";
import { Router } from "@angular/router";



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginViewComponent extends LoginOutputLogic {
  showDragDrop: boolean = true;
  showFormArticle: boolean = true;

  constructor(
    @Inject(ProviderServices.userService) private _userService: IUserService,
    private router: Router
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
    if(this.success) {
      this.router.navigate(['/']);
    }
  }

  loginUser(userRequest: UserLoginRequest): void  {
    this._userService.loginUser(userRequest).subscribe({
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
    this.modalMessage = "usuario logueado correctamente";

    const token = response.body?.token;
    if (token) {
      const decodedToken: any = jwt_decode.jwtDecode(token)
      const role = decodedToken?.authorities;
      const userName = decodedToken?.name;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userName', userName);
    }
  }

  private showErrorModal(error: HttpErrorResponse) {
    this.success = false;
    this.openForm = false;
    this.showModalMessage = true;
    this.modalIcon = EM_ICON['error'];
    this.modalTitle = "Algo salió mal";
    this.modalMessage = error.error.message;
  }
}