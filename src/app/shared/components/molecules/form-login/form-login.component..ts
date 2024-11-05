import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { loginForm } from "src/app/core/forms/login.form";
import { userForm } from "src/app/core/forms/user.form";
import { UserLoginRequest } from "src/app/data/network/requests/user-login.request";

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
  @Output() closeFormValue = new EventEmitter<boolean>();
  @Output() loginRequestEvent = new EventEmitter<UserLoginRequest>();
  @Input() showForm!: boolean;

  loginForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeUserForm();
  }

  get email(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  initializeUserForm(): void {
    this.loginForm = this._formBuilder.group(loginForm)
  }
  
  loginUser(): void {
    this.loginRequestEvent.emit(this.loginForm.value);
  }
}