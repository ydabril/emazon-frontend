import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { EM_ICON } from "src/app/core/constants/em-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnChanges, OnInit {
  @Input() isNavMenuExpanded!: boolean;
  navMenuExpamded!: boolean;
  configIcon: string = EM_ICON['config'];
  userRole: string | null = null;

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.navMenuExpamded = this.isNavMenuExpanded;
  }
}