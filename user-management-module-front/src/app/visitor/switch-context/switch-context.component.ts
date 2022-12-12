import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CpuInfo } from 'os';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyContext } from 'src/app/models/backend-fetch/dxr-system';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UserLoginService } from 'src/app/services/visitor-services/user-login.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

export interface SwitchContextComponentData {
    companyContext: CompanyContext;
    companyContextList: CompanyContext[];
}

@Component({
    selector: 'app-switch-context',
    templateUrl: './switch-context.component.html',
    styleUrls: ['./switch-context.component.css']
})
export class SwitchContextComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: SwitchContextComponentData, private utilService: UtilService, private languageService: LanguageService, private userLoginService: UserLoginService) { }

    uiLabels: any = {}

    companyContextList: CompanyContext[] = [];
    selectedItem: CompanyContext = {} as CompanyContext;
    viewContent = false;

    componentCode!: string;
    isSystemAdmin: boolean = false;
    statusTemporaryUse = AppConstant.SUBSCRIPTION_TEMPORARY_COMPANY_STATUS;

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SWITCH_COMPANY;

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.SWITCH_COMPANY, AppConstant.UI_LABEL_TEXT);
        if (this.data) {
            this.selectedItem = this.data.companyContext;
            this.companyContextList = this.data.companyContextList.sort((a, b) => a.companyName.localeCompare(b.companyName));
            this.viewContent = true;
        }
    }

    switchContext() {
        if (this.selectedItem) {
            if (confirm('Page will reload').valueOf()) {
                this.utilService.setCompanyIdCookie(this.selectedItem.companyId);
                // var currentSessionUser: string = this.utilService.getUserIdCookie();
                // this.userLoginService.setLastCompanyIdCookie(currentSessionUser, this.selectedItem.companyId);
                window.location.assign('/');
            } else {
                // this.selectedLanguage = (this.selectedLanguage == this.languageArray[0]) ? this.languageArray[1] : this.languageArray[0];
            }


        }
    }


    selectListItem(item: CompanyContext) {
        this.selectedItem = item;
    }

}
