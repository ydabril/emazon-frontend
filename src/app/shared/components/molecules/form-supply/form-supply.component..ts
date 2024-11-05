import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { loginForm } from "src/app/core/forms/login.form";
import { supplyForm } from "src/app/core/forms/supply.form";
import { userForm } from "src/app/core/forms/user.form";
import { SupplyRequest } from "src/app/data/network/requests/supply.request";
import { UserLoginRequest } from "src/app/data/network/requests/user-login.request";

@Component({
  selector: 'app-form-supply',
  templateUrl: './form-supply.component.html',
  styleUrls: ['./form-supply.component.scss']
})
export class FormSupplyComponent implements OnInit {
  @Output() closeFormValue = new EventEmitter<boolean>();
  @Output() supplyRequestEvent = new EventEmitter<SupplyRequest>();
  @Input() showForm!: boolean;

  supplyForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeSupplyForm();
  }

  get quantity(): AbstractControl {
    return this.supplyForm.get('quantity')!;
  }


  initializeSupplyForm(): void {
    this.supplyForm = this._formBuilder.group(supplyForm)
  }
  
  addSupply(): void {
    this.supplyRequestEvent.emit(this.supplyForm.value);
  }
}