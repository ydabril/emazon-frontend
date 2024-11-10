import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DirectiveModule } from "src/app/core/directives/directive.module";
import { UserServiceProvider } from "src/app/data/providers/user/user.service.provider";
import { SharedModule } from "src/app/shared/shared.module";
import { RegisterRoute } from "./register.routing";
import { RegisterViewComponent } from "./view/register.component";


@NgModule({
  declarations: [RegisterViewComponent],
  imports: [
    RouterModule.forChild(RegisterRoute),
    SharedModule,
    CommonModule,
    DirectiveModule
  ],
  providers: [
    UserServiceProvider
  ]
})
export class RegisterModule { }