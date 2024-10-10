import { Injectable } from '@angular/core';
import {
  AdminCategoryInputLogic,
  AdminCategoryOutputLogic
} from '../view/model/admin-category.model';

@Injectable()
export class AdminCategoryPresenter implements AdminCategoryInputLogic {
  private _view!: AdminCategoryOutputLogic;

  constructor() {}

  public setView(component: AdminCategoryOutputLogic): void {
    this._view = component;
  }

}
