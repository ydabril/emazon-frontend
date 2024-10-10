import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UIRouting } from "./ui.routing";

@NgModule({
  imports: [
    RouterModule.forChild(UIRouting),
  ]
})
export class UIRoutingModule { }
