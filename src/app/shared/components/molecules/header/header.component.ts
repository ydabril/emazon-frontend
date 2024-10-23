import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleMenuValue = new EventEmitter<boolean>();
  isNavMenuExpanded: boolean = false;

  toggleNavMenu() {
    this.isNavMenuExpanded = !this.isNavMenuExpanded;
    this.toggleMenuValue.emit(this.isNavMenuExpanded);
  }
}