import { Routes } from "@angular/router";

export const UIRouting: Routes = [
  {
    path: '',
    children: [
      { path: '', loadChildren: () => import('./admin-category/admin-category.module').then(m => m.AdminCategoryModule) },
      { path: '', loadChildren: () => import('./admin-brand/admin-brand.module').then(m => m.AdminBrandModule) },
      { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
    ]
  }
]
