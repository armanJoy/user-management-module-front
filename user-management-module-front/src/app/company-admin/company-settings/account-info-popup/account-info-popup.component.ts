import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { AppConstant } from 'src/app/config/app-constant';
import { AccountantInfo, CompanyInfoFetch } from 'src/app/models/backend-fetch/company-settings-fetch';
import { PaymentMode } from 'src/app/models/backend-update/company-settings-update';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { BankAccountInfoPopupComponent } from '../bank-account-info-popup/bank-account-info-popup.component';

@Component({
    selector: 'app-account-info-popup',
    templateUrl: './account-info-popup.component.html',
    styleUrls: ['./account-info-popup.component.css']
})
export class AccountInfoPopupComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public companyInfo: CompanyInfoFetch, private breakpointObserver: BreakpointObserver, private companySettingsOperationService: CompanySettingsOperationService, private utilService: UtilService, public matDialog: MatDialog, public dialogRef: MatDialogRef<BankAccountInfoPopupComponent>, private languageService: LanguageService) { }

    accountant?: AccountantInfo;
    uiLabels: any = {};


    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.ACCOUNT_INFO_POPUP;

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.ACCOUNT_INFO_POPUP, AppConstant.UI_LABEL_TEXT);
        if (this.companyInfo)
            this.accountant = this.companyInfo.accountantInfo;
        // this.accountantInfo = Object.assign({}, this.accountant);
        this.accountantInfo = JSON.parse(JSON.stringify(this.accountant));
        this.paymentModeViewList = this.preparePaymentModeViewList(AppConstant.PAYMENT_MODE, this.accountantInfo.paymentMode);

    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );


    accountantInfo: AccountantInfo = {
        companyId: "",
        accountantId: "",
        accountantName: "",
        accountantEmail: "",
        contactNo: "",
        contactNoFormated: "",
        invoiceClosingDate: "",
        invoicePaymentDate: "",
        paymentMode: []
    };
    resetAccountant() {
        this.accountantInfo = {
            companyId: "",
            accountantId: "",
            accountantName: "",
            accountantEmail: "",
            contactNo: "",
            contactNoFormated: "",
            invoiceClosingDate: "",
            invoicePaymentDate: "",
            paymentMode: []
        }
        this.resetpaymentMode();
    };


    addAccountant() {
        var validationReport = this.companySettingsOperationService.accountantInfoFormValidator(this.accountantInfo);

        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        }
        else {

            if (this.accountantInfo) {

                this.accountantInfo.companyId = this.companyInfo.companyId;

                this.accountantInfo.accountantId = (this.accountantInfo.accountantId) ? this.accountantInfo.accountantId : this.utilService.generateUniqueId();
                this.dialogRef.close(this.accountantInfo);
                this.resetAccountant();
            }
        }
    }

    preparePaymentModeViewList(paymentModeList: string[], paymentMode: string[]) {
        var paymentModeViewList: PaymentMode[] = [];
        if (paymentModeList) {
            paymentModeList.forEach(element => {

                if (element == AppConstant.PAYMENT_MODE_CASH) {
                    const payment: PaymentMode = {
                        name: element,
                        isCheck: false,
                        label: this.uiLabels.cash

                    }

                    paymentModeViewList.push(payment);

                } else if (element == AppConstant.PAYMENT_MODE_BANK_TRANSFER) {
                    const payment: PaymentMode = {
                        name: element,
                        isCheck: false,
                        label: this.uiLabels.bankTransfer

                    }

                    paymentModeViewList.push(payment);

                }

            });
        }

        paymentModeViewList.forEach(element => {
            if (paymentMode) {
                paymentMode.forEach((payment) => {

                    if (payment == element.name) {

                        element.isCheck = true;
                    }

                })
            }

        });

        return paymentModeViewList;
    }

    paymentModeViewList: PaymentMode[] = [];

    resetpaymentMode() {
        this.paymentModeViewList.forEach(element => {
            element.isCheck = false;

        });
    }

    onCheckboxChange(e: any) {

        if (e) {
            if (!this.accountantInfo.paymentMode || this.accountantInfo.paymentMode == null) {
                this.accountantInfo.paymentMode = [];
            }
            if (e.target.checked) {
                this.accountantInfo.paymentMode.push(e.target.value);

            } else {
                this.accountantInfo.paymentMode.forEach((element, index) => {
                    if (element == e.target.value) this.accountantInfo.paymentMode.splice(index, 1);

                });
            }
        }
    }




    // uiLabels = {
    //     "saveBtn": "Save",
    //     "close": "Close",
    //     "accountantName": "Accountant Name",
    //     "accountantEmail": "Accountant Email",
    //     "contactNo": "Contact No",
    //     "invoiceCloseDate": "Invoice Closing Date",
    //     "invoicePaymentDate": "Invoice Payment Date",
    //     "paymentMethd": "Payment Mode",
    //     "cash": "Cash",
    //     "bankTransfer": "Bank Transfer",
    // }


}
