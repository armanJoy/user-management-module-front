import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfoFetch } from 'src/app/models/backend-fetch/company-settings-fetch';
import { Catagory, CompanyInfoUpdate } from 'src/app/models/backend-update/company-settings-update';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-company-info-popup',
    templateUrl: './company-info-popup.component.html',
    styleUrls: ['./company-info-popup.component.css']
})
export class CompanyInfoPopupComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public companyInfo: CompanyInfoFetch, private breakpointObserver: BreakpointObserver, private companySettingsOperationService: CompanySettingsOperationService, private utilService: UtilService, public matDialog: MatDialog, public dialogRef: MatDialogRef<CompanyInfoPopupComponent>, private languageService: LanguageService) { }

    uiLabels: any = {};

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.COMPANY_INFO_POPUP;

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.COMPANY_INFO_POPUP, AppConstant.UI_LABEL_TEXT);
        // this.company = Object.assign({}, this.companyInfo);
        this.company = JSON.parse(JSON.stringify(this.companyInfo));
        this.catagoryList = this.prepareCatagoryViewList(AppConstant.COMPANY_CATEGORY, this.company.companyBusinessCategory);
        this.companySettingsOperationService.getCompanyFile(this.companyInfo.companyId).subscribe((data) => {
            this.company.uploadLicense = data.wasteProcessingLicenses;
            this.company.companySealUploadedFile = data.companySealFile;
        });

    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    company: CompanyInfoUpdate = {
        companyId: "",
        companyName: "",
        zipcode: "",
        companyAddress: "",
        representativeName: "",
        representativEmail: "",
        contactNo: "",
        companyBusinessCategory: [],
        companyFaxNumber: " ",
        notification: " ",
        corporateRegNo: " ",
        wasteProcessingLicenseNo: " ",
        companySealUploadedFile: "",
        uploadLicense: "",
        remarks: "",
        companyEmail: '',
        subscriptionId: ''
    };

    upLoadFile(event: any, index: number) {
        this.utilService.convertFileToBase64(event, ((convertedBase64String: string) => {
            if (convertedBase64String) {
                if (index == 1) {
                    this.company.uploadLicense = convertedBase64String;
                }
                // else
                //     if (index == 2) {
                //         this.company.companySealUploadedFile = convertedBase64String;
                //     }
            }
        }));
    }
    uploadCompanySeal(event: any, index: number) {
        this.utilService.convertFileToBase64(event, ((convertedBase64String: string) => {
            if (convertedBase64String) {

                if (index == 2) {
                    this.company.companySealUploadedFile = convertedBase64String;
                }
            }
        }))
    }

    saveCompanyInfo() {
        var validationReport = this.companySettingsOperationService.companyInfoFormValidator(this.company);

        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        }
        else {
            if (this.company) {
                this.dialogRef.close(this.company);
                this.resetCompanyInfoForm();
            }
        }


    }

    prepareCatagoryViewList(companyCatagory: string[], companyBusinessCategory: string[]) {
        var catagoryList: Catagory[] = [];

        companyCatagory.forEach(element => {


            if (element == AppConstant.CATEGORY_NAME_DUMPER) {
                const catagory: Catagory = {
                    name: element,
                    isCheck: false,
                    label: this.uiLabels.dumper

                }

                catagoryList.push(catagory);
            } else if (element == AppConstant.CATEGORY_NAME_PROCESSOR) {
                const catagory: Catagory = {
                    name: element,
                    isCheck: false,
                    label: this.uiLabels.processor

                }

                catagoryList.push(catagory);
            } else if (element == AppConstant.CATEGORY_NAME_TRANSPORTER) {
                const catagory: Catagory = {
                    name: element,
                    isCheck: false,
                    label: this.uiLabels.transporter

                }

                catagoryList.push(catagory);
            }



        });

        catagoryList.forEach(element => {
            companyBusinessCategory.forEach((category) => {
                if (category == element.name) {

                    element.isCheck = true;
                }

            })
        });


        return catagoryList;
    }


    catagoryList: Catagory[] = [];


    resetCompanyInfoForm() {
        this.company = {
            companyId: " ",
            companyName: " ",
            zipcode: "",
            companyAddress: " ",
            representativeName: " ",
            representativEmail: " ",
            contactNo: " ",
            companyBusinessCategory: [],
            companyFaxNumber: " ",
            notification: " ",
            corporateRegNo: " ",
            wasteProcessingLicenseNo: " ",
            uploadLicense: "",
            remarks: "",
            companyEmail: '',
            subscriptionId: '',
            companySealUploadedFile: ""
        }
        this.resetCatagoryList();
    };

    resetCatagoryList() {
        this.catagoryList.forEach(element => {
            element.isCheck = false;

        });

    }

    onCheckboxChange(e: any) {

        if (e) {
            if (e.target.checked) {
                this.company.companyBusinessCategory.push(e.target.value);

            } else {
                this.company.companyBusinessCategory.forEach((element, index) => {
                    if (element == e.target.value) {
                        this.company.companyBusinessCategory.splice(index, 1);
                    }

                });
            }
        }
    }



    SearchZipCodeData(zipCode: string) {
        if (zipCode) {

            this.companySettingsOperationService.getZipCodeInformation(zipCode).subscribe((data) => {
                if (data) {
                    this.company.companyAddress = data.address;
                }

            });
        }

    }




    // uiLabels = {
    //     "companyName": "Company Name*",
    //     "zipCode": "Zip Code",
    //     "companyAddress": "Company Address*",
    //     "representativeName": "Representative Name*",
    //     "representativEmail": "Representative Email",
    //     "contactNo": "Contact No",
    //     "companyBusinessCategory": "Business Type",
    //     "companyFaxNumber": "FAX",
    //     "notification": "Receive Notification",
    //     "accountantName": "Accountant Name",
    //     "accountantEmail": "Accountant Email",
    //     "corporateRegNo": "Corporate No",
    //     "wasteProcessingLicenseNo": "Waste License No*",
    //     "uploadLicense": "Upload License",
    //     "remarks": "Remarks",
    //     "saveBtn": "Save",
    //     "closeBtn": "Close",
    //     "dumper": "Dumper",
    //     "processor": "Processor",
    //     "transporter": "Transporter",
    //     "yes": "Yes",
    //     "no": "No",
    // }

}
