import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { AppConstant } from 'src/app/config/app-constant';
import { BranchInfoFetch } from 'src/app/models/backend-fetch/branch-settings-fetch';
import { BankAccountInfo } from 'src/app/models/backend-fetch/company-settings-fetch';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-bank-account-info-popup',
    templateUrl: './bank-account-info-popup.component.html',
    styleUrls: ['./bank-account-info-popup.component.css']
})
export class BankAccountInfoPopupComponent implements OnInit {

    @Input()
    otherBankAccount: boolean = false;

    @Input()
    fromAgreement: boolean = false;

    @Input()
    companyId: string = '';

    @Input()
    bankAccountInfo: BankAccountInfo = {
        companyId: '',
        bankAccountId: "",
        bankName: "",
        branchName: "",
        accountNumber: "",
        accountName: ""
    };

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private breakpointObserver: BreakpointObserver, private utilService: UtilService, public dialogRef: MatDialogRef<BankAccountInfoPopupComponent>, private companySettingsOperationService: CompanySettingsOperationService, public matDialog: MatDialog, private languageService: LanguageService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.BANK_AACOUNT_INFO_POPUP;
        if (this.data && this.data.bankAccount) {
            if (this.data.bankAccount) {
                this.bankAccountInfo = Object.assign({}, this.data.bankAccount);
            }

            if (this.data.companyId) {
                this.companyId = this.data.companyId;
            }
        }

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    resetBankAccountInfo() {
        this.bankAccountInfo = {
            companyId: "",
            bankAccountId: "",
            bankName: "",
            branchName: "",
            accountNumber: "",
            accountName: ""
        }
    }

    addAccount() {

        var validationReport = this.companySettingsOperationService.bankInfoFormValidator(this.bankAccountInfo);

        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        }
        else {
            if (this.bankAccountInfo) {

                this.bankAccountInfo.companyId = this.companyId;

                this.bankAccountInfo.bankAccountId = (this.bankAccountInfo.bankAccountId) ? this.bankAccountInfo.bankAccountId : this.utilService.generateUniqueId();

                this.dialogRef.close(this.bankAccountInfo);

                this.resetBankAccountInfo();
            }
        }
    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.BANK_AACOUNT_INFO_POPUP, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "addAccountInfo": "Add Account Info",
    //     "branchName": "Branch Name",
    //     "bankName": "Bank Name",
    //     "accountName": "Accounts Name",
    //     "accountNumber": "Accounts Number",
    //     "addBtn": "Save",
    //     "close": "Close"
    // }
}
