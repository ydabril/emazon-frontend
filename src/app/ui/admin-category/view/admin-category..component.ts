import { Component, Inject } from '@angular/core';
import { ProvidersWebApp } from 'src/app/core/constants/enums/providers.enum';
import { AdminCategoryInputLogic, AdminCategoryOutputLogic } from './model/admin-category.model';

@Component({
  selector: 'admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class adminCategoryViewComponent extends AdminCategoryOutputLogic {
  isNavMenuExpanded: boolean = false;

  constructor(
    @Inject(ProvidersWebApp.adminCategortPresenter)
    private _presenter: AdminCategoryInputLogic
  ) {
    super();
    this._presenter.setView(this);
  }

   toggleNavMenu() {
     this.isNavMenuExpanded = !this.isNavMenuExpanded;
   }
}
