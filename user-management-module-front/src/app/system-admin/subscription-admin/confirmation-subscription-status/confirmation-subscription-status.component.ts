import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { ActionConfirmPopupDate } from 'src/app/models/backend-fetch/business-agreement';
import { LanguageService } from 'src/app/services/visitor-services/language.service';

@Component({
    selector: 'app-confirmation-subscription-status',
    templateUrl: './confirmation-subscription-status.component.html',
    styleUrls: ['./confirmation-subscription-status.component.css']
})
export class ConfirmationSubscriptionStatusComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: ActionConfirmPopupDate, private languageService: LanguageService) { }

    ngOnInit(): void {

        // this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.STATUS_ACTION_CONFIRM_POPUP, AppConstant.UI_LABEL_TEXT);
    }

    uiLabels: any = {
        headerLabel: "Action Confirmation",
        currentStatusStatement: "",
        newStatusStatement: "Subscription status will be changed to ",
        cancelButton: "Cancel",
        confirmButton: "OK",
    }

}
