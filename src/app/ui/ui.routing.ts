import { Routes } from "@angular/router";

export const UIRouting: Routes = [
  {
    path: '',
    children: [
      { path: '', loadChildren: () => import('./admin-category/admin-category.module').then(m => m.AdminCategoryModule) },
      { path: '', loadChildren: () => import('./admin-brand/admin-brand.module').then(m => m.AdminBrandModule) },
      { path: '', loadChildren: () => import('./admin-article/admin-article.module').then(m => m.AdminArticleModule) },
      { path: '', loadChildren: () => import('./admin-user/admin-user.module').then(m => m.AdminUserModule) },
      { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
      { path: '', loadChildren: () => import('./landing-article/landing-article.module').then(m => m.LandingArticleModule) }
    ]
  }
]
