import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginRoute } from "./login.routing";
import { LoginViewComponent } from "./view/login.component";
import { SharedModule } from "src/app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { DirectiveModule } from "src/app/core/directives/directive.module";
import { UserServiceProvider } from "src/app/data/providers/user/user.service.provider";


@NgModule({
  declarations: [LoginViewComponent],
  imports: [
    RouterModule.forChild(LoginRoute),
    SharedModule,
    CommonModule,
    DirectiveModule
  ],
  providers: [
    UserServiceProvider
  ]
})
export class LoginModule { }