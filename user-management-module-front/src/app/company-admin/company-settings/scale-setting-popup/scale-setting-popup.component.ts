import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { AppConstant } from 'src/app/config/app-constant';
import { AgreementPartnerInfo } from 'src/app/models/backend-fetch/business-agreement';
import { AccountantInfo, BankAccountInfo, CompanyInfoFetch, ScaleSettingInfo } from 'src/app/models/backend-fetch/company-settings-fetch';
import { UserInfoFetch } from 'src/app/models/backend-fetch/user-management-fetch';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { SelectPersonInChargePopupComponent } from '../../business-agreement/select-person-in-charge-popup/select-person-in-charge-popup.component';

@Component({
    selector: 'app-scale-setting-popup',
    templateUrl: './scale-setting-popup.component.html',
    styleUrls: ['./scale-setting-popup.component.css']
})
export class ScaleSettingPopupComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private breakpointObserver: BreakpointObserver, private companySettingsOperationService: CompanySettingsOperationService, private utilService: UtilService, public matDialog: MatDialog, private languageService: LanguageService, public dialogRef: MatDialogRef<ScaleSettingPopupComponent>) { }

    scaleInfo?: ScaleSettingInfo;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SCALE_SETTING_POPUP;

        if (this.data.scale) {
            // this.scaleInfo = this.companyInfo.scaleSettingInfo;
            this.scaleSetting = JSON.parse(JSON.stringify(this.data.scale));
        }


    }

    openSelectPersonInChargePopup() {
        var agreementPartnerInfo: AgreementPartnerInfo = {
            agreementPartnerInfoId: '',
            companyId: this.utilService.getCompanyIdCookie(),
            companyName: '',
            companyZipCode: '',
            companyZipCodeFormated: '',
            companyAddress: '',
            contactNo: '',
            contactNoFormated: '',
            personInChargeId: this.scaleSetting.responsiblePersonId,
            personInChargeName: '',
            personInchargeEmail: '',
            accountantInfo: {} as AccountantInfo,
            accountInfo: {} as BankAccountInfo,
            otherBankAccountInfo: {} as BankAccountInfo,
            accountType: '',
            assignedRoles: '',
            companyBusinessCategory: [],
            companyRoleSelection: [],
            isApprovalDone: false,
            companyCategorySelection: JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory)),
            roleIndex: -1,
            paymentMethodSelection: AppConstant.AGREEMENT_PARTNER_PAYMENT_METHOD,
            bankPayment: true
        }
        const selectPersonInChargePopup = this.matDialog.open(SelectPersonInChargePopupComponent, {
            width: '75%',
            height: '75%',
            data: agreementPartnerInfo
        });

        selectPersonInChargePopup.afterClosed().subscribe((data: UserInfoFetch) => {

            if (data) {
                this.scaleSetting.responsiblePersonId = data.userInfoId;
                this.scaleSetting.personName = data.userName;
                this.scaleSetting.personContact = data.userContactNo;
                this.scaleSetting.personEmail = data.userEmail;
                if (data.userSealUploadedFile) {
                    this.scaleSetting.personSeal = data.userSealUploadedFile;
                }

            }
        });
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    scaleSetting: ScaleSettingInfo = {
        companyId: '',
        scaleId: '',
        nameOfScale: '',
        capacity: 0,
        scaleNumber: '',
        quantity: 0,
        registrationNo: '',
        responsiblePersonId: '',
        personName: '',
        personContact: '',
        personEmail: '',
        personSeal: ''
    };
    resetScaleSettingInfo() {
        this.scaleSetting = {
            companyId: '',
            scaleId: '',
            nameOfScale: '',
            capacity: 0,
            scaleNumber: '',
            quantity: 0,
            registrationNo: '',
            responsiblePersonId: '',
            personName: '',
            personContact: '',
            personEmail: '',
            personSeal: ''
        }
    }


    addScale() {
        var validationReport = this.companySettingsOperationService.ScaleInfoFormValidator(this.scaleSetting);

        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        }
        else {

            if (this.scaleSetting) {

                this.scaleSetting.companyId = this.data.companyId;

                this.scaleSetting.scaleId = (this.scaleSetting.scaleId) ? this.scaleSetting.scaleId : this.utilService.generateUniqueId();
                this.dialogRef.close(this.scaleSetting);
                this.resetScaleSettingInfo();
            }
        }
    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.SCALE_SETTING_POPUP, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "close": "Close",
    //     "saveBtn": "Save",
    //     "nameOfScale": "Name of Scale*",
    //     "capacity": "Capacity",
    //     "scaleNumber": "Scale Number",
    //     "quantity": "Quantity",
    //     "registNo": "Measurement Certification Business Registratuion Number*",

    // }
}
