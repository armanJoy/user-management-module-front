import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptionUpdateInfo } from 'src/app/models/backend-update/subscription-update';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { SubscriptionStatus } from 'src/app/models/backend-fetch/subscription-fetch';
@Component({
    selector: 'app-subscription-pop',
    templateUrl: './subscription-popup.component.html',
    styleUrls: ['./subscription-popup.component.css']
})
export class SubscriptionPopComponent implements OnInit {

    constructor(private languageService: LanguageService, public dialogRef: MatDialogRef<SubscriptionPopComponent>, @Inject(MAT_DIALOG_DATA) public data: SubscriptionUpdateInfo, private utilService: UtilService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;
    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SUBSCRIPTION_SUCCESSFULL_POPUP;
        this.subscription = this.data;
    }
    subscription: SubscriptionUpdateInfo = {
        id: '',
        companyName: '',
        address: '',
        contactNo: '',
        subscriptionEmail: '',
        companyCategory: [],
        isHuman: false,
        isAgree: false,
        response: '',
        subscriberName: '',
        subscriberMail: '',
        zipCode: '',
        password: '',
        status: {} as SubscriptionStatus,
        requesterMail: "",
    }
    onClick(): void {

        this.dialogRef.close(this.subscription);
    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.SUBSCRIPTION_SUCCESSFULL_POPUP, AppConstant.UI_MESSAGE_TEXT);

}
