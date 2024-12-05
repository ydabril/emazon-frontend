import { Component } from "@angular/core";
import { LoaderService } from "src/app/common/utils/loader.service";

@Component({
    selector: 'app-loader',
    template: `
      <div *ngIf="isLoading | async" class="loader-overlay">
        <div class="loader"></div>
      </div>
    `,
    styleUrls: ['./loader.component.scss']
  })
  export class LoaderComponent {
    isLoading = this.loaderService.loading$;
  
    constructor(private loaderService: LoaderService) {}
  }
  