
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { errorsRoute } from "./errors.routing";

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(errorsRoute),
  ],
  exports: [
  
  ]
})
export class ErrosModule { }
