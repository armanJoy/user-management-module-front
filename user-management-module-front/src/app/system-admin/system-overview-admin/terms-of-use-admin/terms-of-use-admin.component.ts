import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-terms-of-use-admin',
    templateUrl: './terms-of-use-admin.component.html',
    styleUrls: ['./terms-of-use-admin.component.css']
})
export class TermsOfUseAdminComponent implements OnInit {

    constructor() { }
    uiLabels = {
        headerLabel: 'Terms of Use'
    }
    ngOnInit(): void {
    }

}
