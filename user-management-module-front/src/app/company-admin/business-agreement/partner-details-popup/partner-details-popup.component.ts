import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { PartnerInfo } from 'src/app/models/backend-fetch/business-agreement';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-partner-details-popup',
    templateUrl: './partner-details-popup.component.html',
    styleUrls: ['./partner-details-popup.component.css']
})
export class PartnerDetailsPopupComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public companyInfo: PartnerInfo, private languageService: LanguageService, private utilService: UtilService) { }

    uiLabels: any = {
        company: "Company Name",
        companyInfoTab: "Company Info",
        branchInfoTab: "Branch Info",
        vehicleInfoTab: "Vehicle Info",
        basePriceTab: "Base Price",
    }


    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.PARTNER_DETAILS_POPUP, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.PARTNER_DETAILS_POPUP;
    }

    getPartnerDetails(partnerCompanyId: string) {


    }

    selectedIndex = 0;
    indexChange(index: any) {
        this.selectedIndex = index

    }

}
