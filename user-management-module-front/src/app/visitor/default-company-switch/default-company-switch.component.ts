import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CpuInfo } from 'os';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyContext } from 'src/app/models/backend-fetch/dxr-system';
import { DefaultCompany } from 'src/app/models/backend-update/user-login';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UserLoginService } from 'src/app/services/visitor-services/user-login.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { SwitchContextComponentData } from '../switch-context/switch-context.component';

@Component({
    selector: 'app-default-company-switch',
    templateUrl: './default-company-switch.component.html',
    styleUrls: ['./default-company-switch.component.css']
})
export class DefaultCompanySwitchComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: SwitchContextComponentData, private utilService: UtilService, private userLoginService: UserLoginService, private languageService: LanguageService, public dialogRef: MatDialogRef<DefaultCompanySwitchComponent>) { }

    uiLabels: any = {
        pageHeader: 'Default Company Preference',
        currentCompanyLabel: 'Current Company',
        switchToCompanyLabel: 'Set To',
        switchButton: 'Save',
        closeButton: 'Close',
        saveToast: "Preference Saved"

    }

    statusTemporaryUse = AppConstant.SUBSCRIPTION_TEMPORARY_COMPANY_STATUS;

    companyContextList: CompanyContext[] = [];
    selectedItem: CompanyContext = {} as CompanyContext;
    viewContent = false;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.DEFAULT_COMPANY_SWITCH_COMPONENT;

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        if (this.data) {
            this.selectedItem = this.data.companyContext;
            this.companyContextList = this.data.companyContextList.sort((a, b) => a.companyName.localeCompare(b.companyName));
            this.viewContent = true;
        }
    }

    switchContext() {
        if (this.selectedItem) {
            var defaultCompanyPreference: DefaultCompany = {
                userId: this.utilService.getUserIdCookie(),
                defaultCompanyId: this.selectedItem.companyId
            }
            this.userLoginService.saveDefaultCompanyPreference(defaultCompanyPreference).subscribe(data => {
                if (data) {
                    this.utilService.setDefaultCompanyIdCookie(this.selectedItem.companyId);
                }
                this.utilService.showSnackbar(this.uiLabels.saveToast, 3000);
                setTimeout(() => { this.dialogRef.close(); }, 200);

            });
        }
    }

    selectListItem(item: CompanyContext) {
        this.selectedItem = item;
    }

}
