import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DeleteConfirmationComponent } from 'src/app/common-directives/delete-confirmation/delete-confirmation.component';
import { AppConstant } from 'src/app/config/app-constant';
import { AccountantInfo, BankAccountInfo, CompanyInfoFetch } from 'src/app/models/backend-fetch/company-settings-fetch';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AccountInfoPopupComponent } from '../account-info-popup/account-info-popup.component';
import { BankAccountInfoPopupComponent } from '../bank-account-info-popup/bank-account-info-popup.component';

@Component({
    selector: 'app-account-info-tab',
    templateUrl: './account-info-tab.component.html',
    styleUrls: ['./account-info-tab.component.css']
})
export class AccountInfoTabComponent implements OnInit {

    @Input()
    public isViewMode!: boolean;

    @Input()
    public selectTab!: (index: number, companyInfo: CompanyInfoFetch) => void;

    @Input()
    public companyInfo!: CompanyInfoFetch;

    constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver, private utilService: UtilService, private companySettingsOperationService: CompanySettingsOperationService, private languageService: LanguageService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.ACCOUNT_INFO_TAB;

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    };


    updateBankAccoutInfoViewList(bankAccout: BankAccountInfo) {
        if (bankAccout) {
            var updateFlag = false;
            this.companyInfo.bankAccountList.forEach((element) => {

                if (element.bankAccountId == bankAccout.bankAccountId) {
                    var index = this.companyInfo.bankAccountList.indexOf(element);
                    this.companyInfo.bankAccountList[index] = bankAccout;
                    updateFlag = true;
                }

            });
            if (updateFlag == false) {
                this.companyInfo.bankAccountList.unshift(bankAccout);

            }

        }
    }

    saveAccountantViewInfo(accountant: AccountantInfo) {
        if (accountant) {
            accountant.contactNoFormated = this.utilService.prepareContactNoFormate(accountant.contactNo);
            this.companyInfo.accountantInfo = accountant;
        }
    }

    openAccountantInfoDiolog(companyInfo: CompanyInfoFetch): void {
        const sampleDialog = this.dialog.open(AccountInfoPopupComponent, {
            width: '75%',
            // height: '60%',
            data: companyInfo,
            disableClose: true
        });
        sampleDialog.afterClosed().subscribe(result => {
            if (result) {
                this.companySettingsOperationService.updateAccountantInfo(result).subscribe((data) => {
                    if (data) {
                        this.saveAccountantViewInfo(data);
                    }
                })

            }

        });
    }

    openBankAccountInfoDiolog(bankAccount?: BankAccountInfo): void {
        const sampleDialog = this.dialog.open(BankAccountInfoPopupComponent, {
            width: '75%',
            // height: '60%',
            data: {
                bankAccount: (bankAccount) ? bankAccount : null,
                companyId: this.companyInfo.companyId
            },
            disableClose: true
        });
        sampleDialog.afterClosed().subscribe(result => {
            if (result) {
                this.companySettingsOperationService.addBankAccountInfo(result).subscribe((data) => {
                    if (data) {
                        this.updateBankAccoutInfoViewList(data);
                    }
                })

            }

        });
    }


    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.ACCOUNT_INFO_TAB, AppConstant.UI_LABEL_TEXT);

    removeBankAccount(itemId: string) {
        var removeTriggerData: RemoveTriggerData = {
            itemeId: itemId,
            triggerUserId: this.utilService.getUserIdCookie(),
            triggerCompanyId: this.utilService.getCompanyIdCookie(),
            removeOperationType: AppConstant.BANK_ACCOUNT_REMOVE_OPERATION
        }

        this.companySettingsOperationService.getBankAccountForwardLinks(itemId).subscribe(forwardLinks => {
            const removeDialog = this.dialog.open(DeleteConfirmationComponent, {
                width: '40%',
                // height: '30%',
                data: forwardLinks,
                disableClose: true
            });

            removeDialog.afterClosed().subscribe(response => {
                if (response) {
                    this.companySettingsOperationService.removeBankAccount(removeTriggerData).subscribe(response => {
                        if (response) {
                            this.utilService.showRemovedToast();
                            this.removeBankAccountFromViewList(itemId);

                        }
                    });
                }
            });

        });


    }

    removeBankAccountFromViewList(bankAcccountId: string) {
        var index = this.companyInfo.bankAccountList.findIndex(item => item.bankAccountId == bankAcccountId);

        if (index >= 0) {
            this.companyInfo.bankAccountList.splice(index, 1);
        }
    }

}
