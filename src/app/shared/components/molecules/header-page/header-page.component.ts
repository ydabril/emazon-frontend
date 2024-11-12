import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UtilsService } from "src/app/common/utils/utils.service";
import { EM_ICON } from "src/app/core/constants/em-icons";

@Component({
  selector: 'header',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent implements OnInit {
  @Output() toggleMenuValue = new EventEmitter<boolean>();

  existToken!: boolean;
  userName!: string | null;
  role!: string | null;
  showHeaderMenu: boolean = false;
  isNavMenuExpanded: boolean = false;
  userIcon: string = EM_ICON['user'];
  cartIcon: string = EM_ICON['cart']
  arrowIcon: string = EM_ICON['arrowDropdown']

  constructor(
    private route: ActivatedRoute,
    private _utils: UtilsService,
  ) { }

  ngOnInit(): void {
    this.validateExistToken();
  }

  toggleNavMenu() {
    this.isNavMenuExpanded = !this.isNavMenuExpanded;
    this.toggleMenuValue.emit(this.isNavMenuExpanded);
  }

  changeHeaderMenu() {
    this.showHeaderMenu = !this.showHeaderMenu
  }

  validateExistToken() {
    const token = localStorage.getItem('token');
    if(token) {
      this.existToken = true;
      this.userName = localStorage.getItem('userName');
      this.role = localStorage.getItem('role');
    } else {
      this.existToken = false;
    }
  }

  logout() {
    this._utils.logout();
    this.showHeaderMenu = false;
    this.validateExistToken();
  }
}