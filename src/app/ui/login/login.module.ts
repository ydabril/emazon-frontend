import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginRoute } from "./login.routing";
import { LoginViewComponent } from "./view/login.component";


@NgModule({
  declarations: [LoginViewComponent],
  imports: [
    RouterModule.forChild(LoginRoute),
  ],
  providers: []
})
export class LoginModule { }