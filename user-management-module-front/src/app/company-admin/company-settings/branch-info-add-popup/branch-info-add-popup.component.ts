import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { AppConstant } from 'src/app/config/app-constant';
import { BranchInfoFetch } from 'src/app/models/backend-fetch/company-settings-fetch';
import { BranchInfoUpdate, Catagory } from 'src/app/models/backend-update/company-settings-update';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-branch-info-add-popup',
    templateUrl: './branch-info-add-popup.component.html',
    styleUrls: ['./branch-info-add-popup.component.css']
})
export class BranchInfoAddPopupComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private breakpointObserver: BreakpointObserver, private utilService: UtilService, private companySettingsOperationService: CompanySettingsOperationService, public dialogRef: MatDialogRef<BranchInfoAddPopupComponent>, public matDialog: MatDialog, private languageService: LanguageService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.BRANCH_INFO_ADD_POPUP;

        if (this.data.branch) {
            // this.branchInfo = Object.assign({}, this.data.branch);
            this.branchInfo = JSON.parse(JSON.stringify(this.data.branch));

        }

        if (this.data.companyId) {
            this.companyId = this.data.companyId;
        }
        this.catagoryList = this.prepareCatagoryViewList(AppConstant.COMPANY_CATEGORY, this.branchInfo.branchBusinessCategory);

    }
    companyId: string = '';

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    branchInfo: BranchInfoFetch = {
        companyId: "",
        branchId: "",
        frontendDate: "",
        backendDate: "",
        branchName: "",
        zipcode: "",
        zipcodeFormated: '',
        branchAddress: "",
        branchContactNo: "",
        branchContactNoFormated: '',
        branchFAX: "",
        branchFAXFormated: '',
        branchInchargeName: "",
        branchBusinessCategory: [],
        remark: ""

    };

    resetBranchInfo() {
        this.branchInfo = {
            companyId: "",
            branchId: "",
            frontendDate: "",
            backendDate: "",
            branchName: "",
            zipcode: "",
            zipcodeFormated: '',
            branchAddress: "",
            branchContactNo: "",
            branchContactNoFormated: '',
            branchFAX: "",
            branchFAXFormated: '',
            branchInchargeName: "",
            branchBusinessCategory: [],
            remark: ""
        }
        this.resetCatagoryList();
    }

    SearchZipCodeData(zipCode: string) {
        if (zipCode) {

            this.companySettingsOperationService.getZipCodeInformation(zipCode).subscribe((data) => {
                if (data) {
                    this.branchInfo.branchAddress = data.address;
                }
                data

            });
        }

    }

    prepareContactNumberFormate() {
        const branchinfoContactNo: string = this.branchInfo.branchContactNo;
        this.branchInfo.branchContactNo = '';
        if (branchinfoContactNo) {
            for (let index = 0; index < branchinfoContactNo.length; index++) {

                this.branchInfo.branchContactNo = this.branchInfo.branchContactNo + branchinfoContactNo[index];
                if (index == 1 || index == 5)
                    this.branchInfo.branchContactNo += '-';
            }
        }
    }

    prepareZipCodeFormate() {
        const zipCode: string = this.branchInfo.zipcode;
        this.branchInfo.zipcode = '';
        if (zipCode) {
            for (let index = 0; index < zipCode.length; index++) {

                this.branchInfo.zipcode = this.branchInfo.zipcode + zipCode[index];
                if (index == 2)
                    this.branchInfo.zipcode += '-';

            }
        }
    }
    addBranch() {
        var validationReport = this.companySettingsOperationService.branchInfoFormValidator(this.branchInfo);

        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        }
        else {
            if (this.branchInfo) {
                this.branchInfo.companyId = this.companyId;

                this.branchInfo.branchId = (this.branchInfo.branchId) ? this.branchInfo.branchId : this.utilService.generateUniqueId();

                this.dialogRef.close(this.branchInfo);
                // this.prepareContactNumberFormate();
                // this.prepareZipCodeFormate();
                this.resetBranchInfo();
            }
        }


    }

    prepareCatagoryViewList(companyCatagory: string[], branchBusinessCategory: string[]) {
        var catagoryList: Catagory[] = [];
        if (companyCatagory) {
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
        }

        catagoryList.forEach(element => {
            if (branchBusinessCategory) {
                branchBusinessCategory.forEach((category) => {
                    if (category == element.name) {

                        element.isCheck = true;
                    }

                })

            }
        });

        return catagoryList;
    }

    catagoryList: Catagory[] = [];

    resetCatagoryList() {
        this.catagoryList.forEach(element => {
            element.isCheck = false;

        });
    }

    onCheckboxChange(e: any) {

        if (e) {
            if (e.target.checked) {
                this.branchInfo.branchBusinessCategory.push(e.target.value);

            } else {
                this.branchInfo.branchBusinessCategory.forEach((element, index) => {
                    if (element == e.target.value) this.branchInfo.branchBusinessCategory.splice(index, 1);

                });
            }
        }
    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.BRANCH_INFO_ADD_POPUP, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "branchInfo": "Branch Info",
    //     "branchName": "Branch Name",
    //     "zipCode": "Zip Code",
    //     "branchAddress": "Branch Address",
    //     "contactNo": "Contact No",
    //     "fax": "FAX",
    //     "personInCharge": "Branch Manager",
    //     "businessType": "Business Type",
    //     "remarks": "Remarks",
    //     "dumper": "Dumper",
    //     "processor": "Processor",
    //     "transporter": "Transporter",
    //     "addBtn": "Save",
    //     "close": "Close"
    // }
}
