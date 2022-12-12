import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { SubscriptionStatus } from 'src/app/models/backend-fetch/subscription-fetch';
import { SubscriptionUpdateInfo, SubscriptionUpdateInfoForForm } from 'src/app/models/backend-update/subscription-update';
import { SubscriptionPopComponent } from '../subscription-pop-up/subscription-popup.component';
import { SubscriptionVisitorService } from 'src/app/services/visitor-services/subscription-visitor.service';
import { AppConstant } from 'src/app/config/app-constant';
import { Catagory } from 'src/app/models/backend-update/subscription-update';
import { SubscriptionFormValidator } from './subscription-form-validator';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { TermAndConditionPopupComponent } from 'src/app/common-directives/term-and-condition-popup/term-and-condition-popup.component';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { NotificationSetInfo } from 'src/app/models/backend-fetch/notification';

@Component({
    selector: 'app-subscription-form',
    templateUrl: './subscription-form.component.html',
    styleUrls: ['./subscription-form.component.css']
})

export class SubscriptionFormComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, private languageService: LanguageService, private subscriptionVisitorService: SubscriptionVisitorService, private validation: SubscriptionFormValidator, private utilService: UtilService, private matDialogRef: MatDialogRef<SubscriptionFormComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }

    uiLabels: any;
    componentCode!: string;
    isSystemAdmin: boolean = false;
    catagoryList: Catagory[] = [];
    isPopup: boolean = false;
    notificationSetInfo: NotificationSetInfo = {
        contextId: "",
        companyId: "",
        baseTableId: "",
        trigerUserInfoId: "",
        status: {
            id: "",
            titleEng: "",
            titleJpn: ""
        }
    }

    subscriptionInformation: SubscriptionUpdateInfo = {
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

    subscriptionFormInformation: SubscriptionUpdateInfoForForm = {
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
        zipcode: '',
        newPassword: '',
        confirmPassword: '',
        requesterMail: "",
        wasteProcessingLicenceNo: ""
    }

    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.SUBSCRIPTION_FORM, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SUBSCRIPTION_FORM;
        this.getCatagoryList(AppConstant.COMPANY_CATEGORY);

        if (this.data && this.data.isPopup) {
            this.isPopup = true;
        }
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    SearchZipCodeData(zipCode: string) {
        if (zipCode) {

            this.subscriptionVisitorService.getZipCodeInformation(zipCode).subscribe((data) => {
                if (data) {
                    this.subscriptionFormInformation.address = data.address;
                }
                data

            });
        }

    }

    getCatagoryList(companyCatagory: string[]) {
        companyCatagory.forEach(element => {
            if (element == 'Dumper') {
                const catagory: Catagory = {
                    name: element,
                    isCheck: false,
                    label: this.uiLabels.dumper

                }

                this.catagoryList.push(catagory);
            }
            else
                if (element == 'Processor') {
                    const catagory: Catagory = {
                        name: element,
                        isCheck: false,
                        label: this.uiLabels.processor

                    }

                    this.catagoryList.push(catagory);
                }
                else
                    if (element == 'Transporter') {
                        const catagory: Catagory = {
                            name: element,
                            isCheck: false,
                            label: this.uiLabels.transporter

                        }

                        this.catagoryList.push(catagory);
                    }



        });
    }

    resetForm() {
        this.subscriptionFormInformation = {
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
            zipcode: '',
            newPassword: '',
            confirmPassword: '',
            requesterMail: "",
            wasteProcessingLicenceNo: ""

        }
        this.resetCatagoryList();

    }

    resetCatagoryList() {
        this.catagoryList.forEach(element => {
            element.isCheck = false;

        });

    }


    prepareContactNumberFormate() {
        this.subscriptionInformation.contactNo = '';
        for (let index = 0; index < this.subscriptionFormInformation.contactNo.length; index++) {

            this.subscriptionInformation.contactNo = this.subscriptionInformation.contactNo + this.subscriptionFormInformation.contactNo[index];
            if (index == 1 || index == 5)
                this.subscriptionInformation.contactNo += '-';

        }
    }

    passwordMatchFlag = '';
    checkPasswordSimilarity() {
        if (this.subscriptionFormInformation.confirmPassword.length < 6) {
            this.passwordLengthFlag = AppConstant.PASSWORD_LENGTH_NOT_MATCHED_FLAG;
        }

        if (this.subscriptionFormInformation.newPassword == this.subscriptionFormInformation.confirmPassword) {
            this.passwordMatchFlag = AppConstant.PASSWORD_MATCHED_FLAG;

        } else {
            this.passwordMatchFlag = AppConstant.PASSWORD_NOT_MATCHED_FLAG;

        }
    }

    passwordLengthFlag = '';
    checkPasswordLength() {
        if (this.subscriptionFormInformation.newPassword.length < 6 || this.subscriptionFormInformation.confirmPassword.length < 6) {
            this.passwordLengthFlag = AppConstant.PASSWORD_LENGTH_NOT_MATCHED_FLAG;
        } else {
            this.passwordLengthFlag = AppConstant.PASSWORD_LENGTH_MATCHED_FLAG;
        }
    }

    onSubmit(): void {

        var subscriptionInformation: SubscriptionUpdateInfo = this.prepareSubscriptionInformationForSave(this.subscriptionFormInformation);

        var validationReport = this.validation.subscriptionFormValidator(subscriptionInformation);

        if (validationReport && validationReport.invalidCount > 0) {
            this.dialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        } else {
            this.prepareContactNumberFormate();

            subscriptionInformation.id = this.utilService.generateUniqueId();
            this.callVisitorServiceforSaveSubscription(subscriptionInformation);
        }
    }

    callVisitorServiceforSaveSubscription(subscriptionInformation: SubscriptionUpdateInfo) {
        this.subscriptionVisitorService.saveSubscription(subscriptionInformation).subscribe((data) => {
            if (data) {
                this.openSubscriptionDialog(data);
                this.saveNotification(data.id)
            }

            this.resetForm();

            if (this.isPopup) {
                this.matDialogRef.close();
            }
        });

    }

    saveNotification(subscriptionId: string) {
        this.notificationSetInfo.baseTableId = subscriptionId;
        this.notificationSetInfo.contextId = AppConstant.SUBSCRIPTION_NOTIFICAIONT_ID;
        this.subscriptionVisitorService.sendNotification(this.notificationSetInfo).subscribe(data => {

        })
    }

    prepareSubscriptionInformationForSave(subscriptionFormInformation: SubscriptionUpdateInfoForForm): SubscriptionUpdateInfo {
        var subscriptionInformation!: SubscriptionUpdateInfo;
        if (subscriptionFormInformation) {
            var randomPassword = this.utilService.generateAlphaNumericPassword();
            var encryptedPassword = this.utilService.encrypt(randomPassword);

            var requesterMail: string = this.utilService.getUserIdCookie();

            if (encryptedPassword) {
                subscriptionInformation = {
                    id: '',
                    companyName: subscriptionFormInformation.companyName,
                    address: subscriptionFormInformation.address,
                    contactNo: subscriptionFormInformation.contactNo,
                    isAgree: subscriptionFormInformation.isAgree,
                    response: AppConstant.SUBSCRIPTION_INITIAL_SUBMIT_STATUS,
                    subscriberMail: subscriptionFormInformation.subscriberMail,
                    subscriberName: subscriptionFormInformation.subscriberName,
                    subscriptionEmail: subscriptionFormInformation.subscriptionEmail,
                    companyCategory: subscriptionFormInformation.companyCategory,
                    zipCode: subscriptionFormInformation.zipcode,
                    password: encryptedPassword,
                    isHuman: subscriptionFormInformation.isHuman,
                    status: {
                        statusId: AppConstant.SUBSCRIPTION_INITIAL_STATUS,
                        statusTitle: ""
                    },
                    requesterMail: (requesterMail) ? requesterMail : '',
                    wasteProcessingLicenceNo: subscriptionFormInformation.wasteProcessingLicenceNo
                    // statusId: AppConstant.SUBSCRIPTION_INITIAL_STATUS
                }
            }

        }
        return subscriptionInformation;
    }

    openSubscriptionDialog(subscription: SubscriptionUpdateInfo): void {
        if (subscription) {
            const dialogRef = this.dialog.open(SubscriptionPopComponent, {
                width: '600px',
                data: subscription,
                disableClose: true
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result) {

                    // this.onRest();

                }
                ;
            });
        }
    }
    termsAndConditionPopupOpen() {
        const dialogRef = this.dialog.open(TermAndConditionPopupComponent, {
            width: '600px',

            // data: subscription,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (result) {
                    this.subscriptionFormInformation.isAgree = true
                }
                // this.onRest();

            }
            ;
        });
    }
    onCheckboxChange(e: any) {

        // alert('hi');

        if (e) {
            if (e.target.checked) {
                this.subscriptionFormInformation.companyCategory.push(e.target.value);

            } else {
                this.subscriptionFormInformation.companyCategory.forEach((element, index) => {
                    if (element == e.target.value) this.subscriptionFormInformation.companyCategory.splice(index, 1);

                });
            }
        }
    }
}
