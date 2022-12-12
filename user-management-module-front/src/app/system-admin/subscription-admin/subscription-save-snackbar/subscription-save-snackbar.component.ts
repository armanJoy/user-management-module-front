import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-subscription-save-snackbar',
    templateUrl: './subscription-save-snackbar.component.html',
    styleUrls: ['./subscription-save-snackbar.component.css']
})
export class SubscriptionSaveSnackbarComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }
    uiLabels = {
        snackbarMessage: "Save"
    }

}
