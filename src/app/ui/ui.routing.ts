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
      { path: '', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
      { path: '', loadChildren: () => import('./landing-article/landing-article.module').then(m => m.LandingArticleModule) },
      { path: '', loadChildren: () => import('./article-details/article-details.module').then(m => m.ArticleDetailsModule) },
      { path: '', loadChildren: () => import('./sale-page/sale.module').then(m => m.SaleModule) },
      { path: '', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
      { path: '', loadChildren: () => import('./report-client/report-client.module').then(m => m.ReportClientModule) }
    ]
  }
]
