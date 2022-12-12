import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfoFetch } from 'src/app/models/backend-fetch/company-settings-fetch';
import { CompanyInfoUpdate } from 'src/app/models/backend-update/company-settings-update';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { CompanyInfoPopupComponent } from '../company-info-popup/company-info-popup.component';
import { FileView } from 'src/app/models/backend-fetch/user-management-fetch';
import { LicenseViewPopupComponent } from '../../user-management/license-view-popup/license-view-popup.component';

@Component({
    selector: 'app-company-info-tab',
    templateUrl: './company-info-tab.component.html',
    styleUrls: ['./company-info-tab.component.css']
})
export class CompanyInfoTabComponent implements OnInit {
    @Input()
    isDumperCompany!: boolean;
    @Input()
    isProcessorCompany!: boolean;
    @Input()
    isTransporterCompany!: boolean;
    @Input()
    public isViewMode!: boolean;

    @Input()
    public selectTab!: (index: number, companyInfo: CompanyInfoFetch) => void;

    @Input()
    public companyInfo!: CompanyInfoFetch;

    constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver, private companySettingsOperationService: CompanySettingsOperationService, private languageService: LanguageService, private utilService: UtilService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.COMPANY_INFO_TAB;
        this.companySettingsOperationService.getCompanyFile(this.companyInfo.companyId).subscribe((data) => {
            this.companyInfo.uploadLicense = data.wasteProcessingLicenses;
            this.companyInfo.companySealUploadedFile = data.companySealFile;
        });

    }



    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );



    openCompanyInfoDiolog(company: CompanyInfoFetch): void {
        const sampleDialog = this.dialog.open(CompanyInfoPopupComponent, {
            width: '75%',
            height: '80%',
            data: company,
            disableClose: true
        });

        sampleDialog.afterClosed().subscribe(result => {
            if (result) {

                this.companySettingsOperationService.saveUpdatedCompanyInfo(result).subscribe((data) => {
                    if (data) {
                        this.getCompanyFiles(data);
                    }
                });
            }
        });
    }

    getCompanyFiles(updatedCompanyInfo: CompanyInfoUpdate) {
        this.companySettingsOperationService.getCompanyFile(this.companyInfo.companyId).subscribe((data) => {
            if (data) {
                updatedCompanyInfo.uploadLicense = data.wasteProcessingLicenses;
                updatedCompanyInfo.companySealUploadedFile = data.companySealFile;
            }
            this.updateCompanyInfo(updatedCompanyInfo);
        });
    }

    updateCompanyInfo(updatedCompanyInfo: CompanyInfoUpdate) {
        this.companyInfo.companyId = updatedCompanyInfo.companyId
        this.companyInfo.companyName = updatedCompanyInfo.companyName
        this.companyInfo.zipcode = updatedCompanyInfo.zipcode
        this.companyInfo.zipcodeFormated = this.utilService.prepareZipCodeFormate(this.companyInfo.zipcode);
        this.companyInfo.companyAddress = updatedCompanyInfo.companyAddress
        this.companyInfo.representativeName = updatedCompanyInfo.representativeName
        this.companyInfo.representativEmail = updatedCompanyInfo.representativEmail
        this.companyInfo.contactNo = updatedCompanyInfo.contactNo
        this.companyInfo.contactNoFormated = this.utilService.prepareContactNoFormate(this.companyInfo.contactNo)
        this.companyInfo.companyBusinessCategory = updatedCompanyInfo.companyBusinessCategory
        this.companyInfo.companyFaxNumber = updatedCompanyInfo.companyFaxNumber
        this.companyInfo.companyFaxNumberFormated = this.utilService.prepareFaxNoFormate(this.companyInfo.companyFaxNumber)
        this.companyInfo.notification = updatedCompanyInfo.notification
        this.companyInfo.corporateRegNo = updatedCompanyInfo.corporateRegNo
        this.companyInfo.wasteProcessingLicenseNo = updatedCompanyInfo.wasteProcessingLicenseNo;
        this.companyInfo.uploadLicense = updatedCompanyInfo.uploadLicense;
        this.companyInfo.companySealUploadedFile = updatedCompanyInfo.companySealUploadedFile;
        this.companyInfo.remarks = updatedCompanyInfo.remarks;
        this.selectTab(0, this.companyInfo);
    }

    prepareCompanyCategory(updatedCompanyInfo: CompanyInfoUpdate) {
        updatedCompanyInfo.companyBusinessCategory.forEach(companyCategory => {
            if (companyCategory == AppConstant.CATEGORY_NAME_DUMPER) {
                this.isDumperCompany = true;
            }
            else if (companyCategory == AppConstant.CATEGORY_NAME_PROCESSOR) {
                this.isProcessorCompany = true;
            }
            else if (companyCategory == AppConstant.CATEGORY_NAME_TRANSPORTER) {
                this.isTransporterCompany = true;
            }

        });
    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.COMPANY_INFO_TAB, AppConstant.UI_LABEL_TEXT);

    OpenLicenseViewPopup(index: number) {
        var fileView: FileView = {
            image: "",
            title: ""
        }
        if (index == 1) {
            fileView.image = this.companyInfo.uploadLicense;
            fileView.title = this.uiLabels.uploadedCompanyLicense;
        }
        else if (index == 2) {
            fileView.image = this.companyInfo.companySealUploadedFile;
            fileView.title = this.uiLabels.uploadedCompanySeal;
        }
        const dialogRef = this.dialog.open(LicenseViewPopupComponent, {
            width: '40%',
            data: fileView,
            // disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }
    // uiLabels = {
    //     "companyName": "Company Name",
    //     "companyAddress": "Company Address",
    //     "representativeName": "Representative Name",
    //     "representativEmail": "Representative Email",
    //     "contactNo": "Contact No",
    //     "companyBusinessCategory": "Business Type",
    //     "companyFaxNumber": "FAX",
    //     "notification": "Receive Notification",
    //     "accountantName": "Accountant Name",
    //     "accountantEmail": "Accountant Email",
    //     "corporateRegNo": "Corporate No",
    //     "wasteProcessingLicenseNo": "Waste License No",
    //     "uploadLicense": "Uploaded License",
    //     "editBtn": "Edit",
    //     "remarks": "Remarks",
    //     "viewLisence": "View License",
    //     "viewFileBtn": "View File",
    //     "companySealUpload": "Upload Company Seal",
    //     "uploadedLicensePreview": 'Uploaded License Preview',
    //     "uploadedCompanySealPreview": 'Uploaded Company Seal Preview',
    // }

}
