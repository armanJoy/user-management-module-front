import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptionUpdateInfo } from 'src/app/models/backend-update/subscription-update';
import { SubscriptionViewInfo } from 'src/app/models/view/subscription-view';
import { SubscriptionConfirmationComponent } from '../subscription-confirmation/subscription-confirmation.component';
import {
    MatSnackBar
} from '@angular/material/snack-bar';
import { SubscriptionSaveSnackbarComponent } from '../subscription-save-snackbar/subscription-save-snackbar.component';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';


@Component({
    selector: 'app-subscription-list-popup',
    templateUrl: './subscription-list-popup.component.html',
    styleUrls: ['./subscription-list-popup.component.css']
})
export class SubscriptionListPopupComponent implements OnInit {

    @ViewChild(SubscriptionConfirmationComponent) child!: SubscriptionConfirmationComponent;

    constructor(private languageService: LanguageService, public dialogRef: MatDialogRef<SubscriptionListPopupComponent>, @Inject(MAT_DIALOG_DATA) public selectedSubscriptionDetail: SubscriptionViewInfo, private _snackBar: MatSnackBar, private utilService: UtilService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;
    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SUBSCRIPTION_LIST_POPUP;

        this.sendSubscriptionDetail = Object.assign({}, this.selectedSubscriptionDetail);

    }


    returnSubscriptionDetail: SubscriptionViewInfo = {
        id: '',
        companyName: '',
        zipCode: '',
        address: '',
        contactNo: '',
        subscriptionEmail: '',
        companyCategory: [],
        isHuman: false,
        isAgree: false,
        response: '',
        backendDate: '',
        frontendDate: '',
        subscriberName: '',
        subscriberMail: ''
    }
    sendSubscriptionDetail: SubscriptionViewInfo = {
        id: '',
        companyName: '',
        zipCode: '',
        address: '',
        contactNo: '',
        subscriptionEmail: '',
        companyCategory: [],
        isHuman: false,
        isAgree: false,
        response: '',
        backendDate: '',
        frontendDate: '',
        subscriberName: '',
        subscriberMail: ''

    }

    // uiLabels = {
    //     save: "Save",
    //     submissionInfo: "Submission Info",
    //     confirmation: "Confirmation"

    // }
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.SUBSCRIPTION_LIST_POPUP, AppConstant.UI_LABEL_TEXT);
    onNoClick(): void {
        this.dialogRef.close(this.sendSubscriptionDetail);
    }

}


