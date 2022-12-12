import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-benefit-admin',
    templateUrl: './benefit-admin.component.html',
    styleUrls: ['./benefit-admin.component.css']
})
export class BenefitAdminComponent implements OnInit {

    constructor() { }
    uiLabels = {
        headerLabel: 'Benefits'
    }
    ngOnInit(): void {
    }

}
