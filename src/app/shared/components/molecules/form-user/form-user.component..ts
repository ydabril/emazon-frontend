import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { userForm } from "src/app/core/forms/user.form";
import { ArticleRequest } from "src/app/data/network/requests/articleRequest";
import { UserRequest } from "src/app/data/network/requests/user.request";
import { Brand } from "src/app/data/network/responses/brand.response";
import { Category } from "src/app/data/network/responses/category.response";

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  @Output() closeFormValue = new EventEmitter<boolean>();
  @Output() userRequestEvent = new EventEmitter<UserRequest>();
  @Input() showForm!: boolean;

  userForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeUserForm();
  }

  get firstName(): AbstractControl {
    return this.userForm.get('firstName')!;
  }

  get lastName(): AbstractControl {
    return this.userForm.get('lastName')!;
  }

  get documentNumber(): AbstractControl {
    return this.userForm.get('documentNumber')!;
  }

  get phoneNumber(): AbstractControl {
    return this.userForm.get('phoneNumber')!;
  }

  get birthdate(): AbstractControl {
    return this.userForm.get('birthdate')!;
  }

  get email(): AbstractControl {
    return this.userForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.userForm.get('password')!;
  }

  initializeUserForm(): void {
    this.userForm = this._formBuilder.group(userForm)
  }
  
  saveUser(): void {
    this.userRequestEvent.emit(this.userForm.value);
  }
}