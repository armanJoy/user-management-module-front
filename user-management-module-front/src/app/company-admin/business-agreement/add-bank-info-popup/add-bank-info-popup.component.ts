import { Component, Inject, OnInit } from '@angular/core';
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
    selector: 'app-add-bank-info-popup',
    templateUrl: './add-bank-info-popup.component.html',
    styleUrls: ['./add-bank-info-popup.component.css']
})
export class AddBankInfoPopupComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService, @Inject(MAT_DIALOG_DATA) public agreementPartnerInfo: AgreementPartnerInfo, private businessAgreementService: BusinessAgreementService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    bankAccountList: BankAccountInfo[] = [];
    uiLabels: any = {
        headerLabel: "Select Company Bank Account",
        bankName: "Department / Job Title",
        branchName: "Contact No",
        addButton: "Add Bank Account"
    }
    viewContent = false;

    otherBankAccountInfo: BankAccountInfo = {} as BankAccountInfo;

    ngOnInit(): void {

    }

    addBankAccountInfo() {

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
}
