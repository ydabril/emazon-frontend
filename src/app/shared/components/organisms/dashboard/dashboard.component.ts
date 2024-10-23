import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DasboardComponent {
    isNavMenuExpanded!: boolean;

    toggleNavMenu(isNavMenuExpanded: boolean) {
        console.log(isNavMenuExpanded);
        
        this.isNavMenuExpanded =  isNavMenuExpanded;
    }
}