import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { ActionConfirmPopupDate } from 'src/app/models/backend-fetch/business-agreement';
import { LanguageService } from 'src/app/services/visitor-services/language.service';

@Component({
    selector: 'app-agreement-action-confirm-popup',
    templateUrl: './agreement-action-confirm-popup.component.html',
    styleUrls: ['./agreement-action-confirm-popup.component.css']
})
export class AgreementActionConfirmPopupComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: ActionConfirmPopupDate, private languageService: LanguageService) { }

    uiLabels: any = {
        headerLabel: "Action Confirmation",
        currentStatusStatement: "",
        newStatusStatement: "Agreement status will be changed to ",
        cancelButton: "Cancel",
        confirmButton: "OK",
    }

    ngOnInit(): void {

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.AGREEMENT_ACTION_CONFIRM_POPUP, AppConstant.UI_LABEL_TEXT);

    }

}
