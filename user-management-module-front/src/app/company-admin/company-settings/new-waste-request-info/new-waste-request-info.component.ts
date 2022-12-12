import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { AppConstant } from 'src/app/config/app-constant';
import { WasteRequestInfo } from 'src/app/models/backend-fetch/company-settings-fetch';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-new-waste-request-info',
    templateUrl: './new-waste-request-info.component.html',
    styleUrls: ['./new-waste-request-info.component.css']
})
export class NewWasteRequestInfoComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private utilService: UtilService, public dialogRef: MatDialogRef<NewWasteRequestInfoComponent>, public dialog: MatDialog, private companySettingsOperationService: CompanySettingsOperationService, private languageService: LanguageService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.WASTE_REQUEST_FORM;

    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    )

    requestInfo: WasteRequestInfo = {
        companyId: "",
        companyName: "",
        userEmail: "",
        userName: "",
        wasteRequestId: "",
        personName: "",
        contactNo: "",
        wasteType: "",
        wasteItem: "",
        unitDef: "",
        wasteShape: "",
        wastePackage: "",
        frontendDate: "",
        backendDate: "",
        reply: "",
        ContactNoFormated: ''
    };



    resetRequestInfo() {
        this.requestInfo = {
            companyId: "",
            companyName: "",
            userEmail: "",
            userName: "",
            wasteRequestId: "",
            personName: "",
            contactNo: "",
            wasteType: "",
            wasteItem: "",
            unitDef: "",
            wasteShape: "",
            wastePackage: "",
            frontendDate: "",
            backendDate: "",
            reply: "",
            ContactNoFormated: ''
        }
    }

    addRequest() {
        var validationReport = this.companySettingsOperationService.wasteRequestFormValidator(this.requestInfo);

        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.dialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        }
        else {
            if (this.requestInfo) {
                this.requestInfo.companyId = this.utilService.getCompanyIdCookie();
                this.requestInfo.userEmail = this.utilService.getUserIdCookie();
                this.requestInfo.wasteRequestId = (this.requestInfo.wasteRequestId) ? this.requestInfo.wasteRequestId : this.utilService.generateUniqueId();

                this.dialogRef.close(this.requestInfo);
                this.resetRequestInfo();
            }
        }


    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.WASTE_REQUEST_FORM, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "pageHeader": "Waste Item Add Request to DX-R",
    //     "personName": "Person Name",
    //     "contactNo": "Contact No",
    //     "wasteType": "Waste Type",
    //     "wasteItem": "Waste Item",
    //     "unitDef": "Waste Unit",
    //     "wasteShape": "Waste Shape",
    //     "wastePackage": "Waste Package",
    //     "close": "Close",
    //     "sendButton": "Send",
    // }
}
