import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-case-admin',
    templateUrl: './case-admin.component.html',
    styleUrls: ['./case-admin.component.css']
})
export class CaseAdminComponent implements OnInit {

    constructor() { }
    uiLabels = {
        headerLabel: 'Case'
    }
    ngOnInit(): void {
    }

}
