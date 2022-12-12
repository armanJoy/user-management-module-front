import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { BusinessAgreementService } from 'src/app/services/operation-services/dumper-admin/business-agreement.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AgreementPartnerInfo } from 'src/app/models/backend-fetch/business-agreement';
import { CompanyInfoUpdate } from 'src/app/models/backend-update/company-settings-update';
import { AppConstant } from 'src/app/config/app-constant';

@Component({
    selector: 'app-target-company-tab',
    templateUrl: './target-company-tab.component.html',
    styleUrls: ['./target-company-tab.component.css']
})
export class TargetCompanyTabComponent implements OnInit {

    @Input()
    public search!: () => void;

    @Input()
    dxrCompanyViewList!: any[]

    @Input()
    switchToCashManifestoTab!: (agreementPartnerInfo: any) => void;

    @Input()
    targetedCompany!: any;

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService, private businessAgreementService: BusinessAgreementService) { }

    selectedCompanyIdList: string[] = [];
    uiLabels: any = {
        headerLabel: "Select Partner Companies",
        companyName: "Company Name",
        businessCategory: "Business Category",
        companyAddress: "Address",
        companyContactNo: "Contact No",
        addButton: "Add Partner Companies",
        selectedPartners: "Selected Company",
        noPartnerMsg: "No trageted company",
        temporary: "Temporary",
        nextButton: "Next",
    };
    componentCode!: string;
    isSystemAdmin: boolean = false;

    selectingMoreThanTwoCompany: boolean = false;
    selectedPartnerList: any[] = [];
    agreementPartnerList: AgreementPartnerInfo[] = [];
    comCategoryFilterString: string = "";

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.TARGET_COMPANY_TAB;
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );


    updateSelectedItemList = (item: any) => {
        this.targetedCompany = item;
        // this.switchToCashManifestoTab(item);
    }



}
