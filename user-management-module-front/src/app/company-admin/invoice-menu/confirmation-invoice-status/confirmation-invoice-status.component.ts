import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { ActionConfirmPopupDate } from 'src/app/models/backend-fetch/business-agreement';
import { LanguageService } from 'src/app/services/visitor-services/language.service';

@Component({
    selector: 'app-confirmation-invoice-status',
    templateUrl: './confirmation-invoice-status.component.html',
    styleUrls: ['./confirmation-invoice-status.component.css']
})
export class ConfirmationInvoiceStatusComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: ActionConfirmPopupDate, private languageService: LanguageService) { }

    uiLabels: any = {
        headerLabel: "Action Confirmation",
        currentStatusStatement: "",
        newStatusStatement: "Invoice status will be changed to ",
        cancelButton: "Cancel",
        confirmButton: "OK",
    }

    ngOnInit(): void {

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.INVOICE_ACTION_CONFIRM_POPUP, AppConstant.UI_LABEL_TEXT);

    }

}
