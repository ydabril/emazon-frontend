import { Routes } from '@angular/router';
import { LandingArticleViewComponent } from './view/landing-article.component';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';


export const landingArticleRoute: Routes = [
  { path: 'landing', component: LandingArticleViewComponent }
]
