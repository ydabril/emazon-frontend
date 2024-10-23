import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent<T extends Record<string, any>> implements OnInit {
    @Input() columns?: Array<any>;
    @Input() rows?: Array<T>;
	
    constructor() {
    }

    ngOnInit(): void {}
}