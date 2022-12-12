import { Component, Inject, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfoFetch } from 'src/app/models/backend-fetch/user-management-fetch';
import { BusinessAgreementService } from 'src/app/services/operation-services/dumper-admin/business-agreement.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AgreementPartnerInfo } from 'src/app/models/backend-fetch/business-agreement';
import { BankAccountInfo } from 'src/app/models/backend-fetch/company-settings-fetch';
import { AppConstant } from 'src/app/config/app-constant';

@Component({
    selector: 'app-select-bank-popup',
    templateUrl: './select-bank-popup.component.html',
    styleUrls: ['./select-bank-popup.component.css']
})
export class SelectBankPopupComponent implements OnInit {

    @Input()
    bankAcComponentData!: any;

    @Input()
    partnerAcInfo!: BankAccountInfo;

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService, @Inject(MAT_DIALOG_DATA) public popupData: any, private businessAgreementService: BusinessAgreementService) { }

    bankAccountList: BankAccountInfo[] = [];
    uiLabels: any = {
        headerLabel: "Selected Company Bank Account",
        bankListHeader: "Select From Company Bank Account",
        bankName: "Department / Job Title",
        branchName: "Contact No",
        addButton: "Add Bank Account",
        closeButton: 'Close'
    }

    otherBankAccount: boolean = false;

    viewContent = false;
    componentCode!: string;
    isSystemAdmin: boolean = false;
    selectedItem: BankAccountInfo = {
        companyId: '',
        bankAccountId: "",
        bankName: "",
        branchName: "",
        accountNumber: "",
        accountName: ""
    }

    bankAccountData: any = {
        bankAccountInfo: this.selectedItem,
        otherBankAccount: false
    }
    otherAccountBackupDate: BankAccountInfo = {
        companyId: '',
        bankAccountId: "",
        bankName: "",
        branchName: "",
        accountNumber: "",
        accountName: ""
    };
    useSavedAccount: boolean = true;
    companyId: string = "";

    ngOnInit(): void {

        this.popupData = (this.bankAcComponentData) ? this.bankAcComponentData : this.popupData;

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.SELECT_BANK_POPUP, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SELECT_BANK_POPUP;


        if (this.popupData.accountType != AppConstant.USE_SAVED_BANK_ACCOUNT) {
            this.otherAccountBackupDate = JSON.parse(JSON.stringify(this.popupData.accountInfo));
        }

        if (this.popupData.companyId) {
            this.companyId = this.popupData.companyId;

            this.businessAgreementService.getCompanyBankAccountList(this.popupData.companyId).subscribe(data => {

                if (data) {
                    this.bankAccountList = data;

                    if (this.popupData.accountInfo) {

                        if (this.popupData.accountType == AppConstant.USE_SAVED_BANK_ACCOUNT) {
                            this.prepareSelectedBankAccount(this.partnerAcInfo.bankAccountId);
                            this.bankAccountData.otherBankAccount = false;
                            this.useSavedAccount = true;
                        }

                    }
                }

                if (this.popupData.accountType != AppConstant.USE_SAVED_BANK_ACCOUNT) {
                    this.bankAccountData.otherBankAccount = true;
                    this.useSavedAccount = false;
                    this.bankAccountData.bankAccountInfo = JSON.parse(JSON.stringify(this.partnerAcInfo));

                }
                this.viewContent = true;

            })
        }

    }


    prepareSelectedBankAccount(banckAccountInfoId: string) {
        if (banckAccountInfoId && this.bankAccountList) {

            if (this.bankAccountList.length > 0) {
                this.selectedItem = this.bankAccountList[0];
                this.bankAccountList.forEach(element => {
                    if (banckAccountInfoId == element.bankAccountId) {
                        this.selectedItem = element;
                        this.bankAccountData.bankAccountInfo = element;
                    }
                });
            }
        }

        // this.viewContent = true;
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );


    selectListItem(item: BankAccountInfo) {
        this.selectedItem = item;

        this.bankAccountData.bankAccountInfo = item;
        this.bankAccountData.otherBankAccount = false;

        // this.assignPartnerAccountInfo(item);
    }

    assignPartnerAccountInfo(sourceAccount: BankAccountInfo) {
        this.partnerAcInfo.companyId = sourceAccount.companyId;
        this.partnerAcInfo.bankAccountId = (sourceAccount.bankAccountId) ? sourceAccount.bankAccountId : this.utilService.generateUniqueId();
        this.partnerAcInfo.bankName = sourceAccount.bankName;
        this.partnerAcInfo.branchName = sourceAccount.branchName;
        this.partnerAcInfo.accountNumber = sourceAccount.accountNumber;
        this.partnerAcInfo.accountName = sourceAccount.accountName;
    }

    setAccountInfo() {
        this.assignPartnerAccountInfo(this.bankAccountData.bankAccountInfo);
    }

    updateListSelection(event: any) {
        let isHandled = false;
        if (event.stopPropagation) {
            event.stopPropagation();
            isHandled = true;
        }
        if (event.preventDefault) {
            event.preventDefault();
            isHandled = true;
        }
        if (this.bankAccountData.otherBankAccount) {
            this.bankAccountData.otherBankAccount = false;
            this.useSavedAccount = true;

        } else {
            this.bankAccountData.otherBankAccount = true;
            this.useSavedAccount = false;
        }

        if (this.bankAccountData.otherBankAccount && this.popupData.accountType == AppConstant.USE_SAVED_BANK_ACCOUNT) {
            this.selectedItem = {
                companyId: '',
                bankAccountId: "",
                bankName: "",
                branchName: "",
                accountNumber: "",
                accountName: ""
            }

            this.bankAccountData.bankAccountInfo = JSON.parse(JSON.stringify(this.selectedItem));
        }

        if (this.bankAccountData.otherBankAccount && this.popupData.accountType != AppConstant.USE_SAVED_BANK_ACCOUNT && this.bankAccountData.otherBankAccount.bankAccountId != this.otherAccountBackupDate.bankAccountId) {
            this.selectedItem = JSON.parse(JSON.stringify(this.otherAccountBackupDate));
            this.bankAccountData.bankAccountInfo = JSON.parse(JSON.stringify(this.selectedItem));
        }

    }

    useSavedAccountSelection(event: any) {
        let isHandled = false;
        if (event.stopPropagation) {
            event.stopPropagation();
            isHandled = true;
        }
        if (event.preventDefault) {
            event.preventDefault();
            isHandled = true;
        }
        if (this.useSavedAccount) {
            this.useSavedAccount = false;
            this.bankAccountData.otherBankAccount = true;
        } else {
            this.useSavedAccount = true;
            this.bankAccountData.otherBankAccount = false;
        }



    }

}
