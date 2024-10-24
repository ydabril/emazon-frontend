import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const appRoute: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./ui/ui.module').then(m => m.UIRoutingModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoute, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }