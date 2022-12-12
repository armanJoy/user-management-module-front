import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessAgreementService } from 'src/app/services/operation-services/dumper-admin/business-agreement.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AgreementPartnerInfo } from 'src/app/models/backend-fetch/business-agreement';
import { CompanyInfoUpdate } from 'src/app/models/backend-update/company-settings-update';
import { AppConstant } from 'src/app/config/app-constant';

@Component({
    selector: 'app-select-agreement-partner-popup',
    templateUrl: './select-agreement-partner-popup.component.html',
    styleUrls: ['./select-agreement-partner-popup.component.css']
})
export class SelectAgreementPartnerPopupComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService, @Inject(MAT_DIALOG_DATA) public popupData: any, private businessAgreementService: BusinessAgreementService, public dialogRef: MatDialogRef<SelectAgreementPartnerPopupComponent>) { }

    dxrCompanyList: CompanyInfoUpdate[] = [];
    dxrCompanyViewList: any[] = [];
    selectedCompanyIdList: string[] = [];
    uiLabels: any = {
        headerLabel: "Select Partner Companies",
        companyName: "Company Name",
        businessCategory: "Business Category",
        companyAddress: "Address",
        companyContactNo: "Contact No",
        addButton: "Add Partner Companies"
    };
    viewContent = false;
    componentCode!: string;
    isSystemAdmin: boolean = false;

    selectingMoreThanTwoCompany: boolean = false;
    selectedPartnerList: any[] = [];
    agreementPartnerList: AgreementPartnerInfo[] = [];
    comCategoryFilterString: string = "";

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SELECT_AGREEMENT_PARTNER_POPUP;
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        this.agreementPartnerList = (this.popupData && this.popupData.partnerList) ? this.popupData.partnerList : [];
        this.comCategoryFilterString = (this.popupData && this.popupData.comCategoryFilterString) ? this.popupData.comCategoryFilterString : "";

        this.search();

        this.selectedPartnerList = this.prepareCompanyViewList(this.agreementPartnerList, this.selectedPartnerList);
    }

    search() {
        var pageNo: number = JSON.parse(JSON.stringify(this.utilService.getPageNo()));
        var searchText: string = JSON.parse(JSON.stringify(this.utilService.getSearchText()));

        if (!searchText) {
            searchText = '';
        }

        if (!pageNo) {
            pageNo = 0;
        }

        this.getCompanyPartnerFromSearch(this.utilService.getCompanyIdCookie(), pageNo, searchText, this.comCategoryFilterString);
    }

    public getCompanyPartnerFromSearch = (companyId: string, pageNo: number, searchText: string, status: string) => {
        if (companyId) {

            this.businessAgreementService.getDxrCompanyListBySearchAndPaginition(companyId, pageNo, searchText, status).subscribe(data => {
                if (data) {
                    this.dxrCompanyList = data;
                    this.dxrCompanyViewList = this.prepareCompanyViewList(data, this.selectedPartnerList);
                }

                this.viewContent = true;
            })
        }
    }

    prepareCompanyViewList(allCompany: any[], selectedCompanyList: AgreementPartnerInfo[]) {
        var dxrCompanyViewList: any[] = [];
        allCompany.forEach(dxrCompany => {
            var eachCompanyViewItem: any = this.prepareCompanyViewItem(dxrCompany, selectedCompanyList);

            dxrCompanyViewList.push(eachCompanyViewItem);
        });

        return dxrCompanyViewList;
    }

    prepareCompanyViewItem(dxrCompany: any, selectedCompanyList: AgreementPartnerInfo[]) {
        var eachCompanyViewItem: any = JSON.parse(JSON.stringify(dxrCompany));
        eachCompanyViewItem.isSelected = false;
        eachCompanyViewItem.businessCategoryView = (dxrCompany.companyBusinessCategory) ? (dxrCompany.companyBusinessCategory.join(', ')) : '';
        eachCompanyViewItem.addressView = this.utilService.prepareZipCodeFormate(dxrCompany.zipcode) + ', ' + dxrCompany.companyAddress;
        eachCompanyViewItem.contactView = this.utilService.prepareContactNoFormate(dxrCompany.contactNo);

        eachCompanyViewItem.isSelected = (selectedCompanyList && selectedCompanyList.findIndex(partnerCompany => dxrCompany.companyId == partnerCompany.companyId) >= 0) ? true : false;

        return eachCompanyViewItem;
    }

    addPartners() {
        var partnerList: AgreementPartnerInfo[] = this.preparePartnerList(this.selectedPartnerList);
        this.dialogRef.close(partnerList);
    }

    preparePartnerList(dxrCompanyViewList: any[]) {
        var partnerList: AgreementPartnerInfo[] = [];

        for (let i = 0; i < dxrCompanyViewList.length; i++) {
            const eachCompany = dxrCompanyViewList[i];

            // if (eachCompany.isSelected) {
            //     
            var isPreviousCompany = false;
            this.agreementPartnerList.forEach(previousCompany => {
                if (previousCompany.companyId == eachCompany.companyId) {
                    partnerList.push(previousCompany);
                    isPreviousCompany = true;
                }
            });

            if (!isPreviousCompany) {

                var newPartnerCompany: AgreementPartnerInfo = {
                    agreementPartnerInfoId: '',
                    companyId: eachCompany.companyId,
                    companyName: eachCompany.companyName,
                    companyZipCode: eachCompany.zipcode,
                    companyZipCodeFormated: this.utilService.prepareZipCodeFormate(eachCompany.zipcode),
                    companyAddress: eachCompany.companyAddress,
                    contactNo: eachCompany.contactNo,
                    contactNoFormated: this.utilService.prepareContactNoFormate(eachCompany.contactNo),
                    personInChargeId: '',
                    personInChargeName: '',
                    accountantInfo: {
                        companyId: '',
                        accountantId: '',
                        accountantName: '',
                        accountantEmail: '',
                        contactNo: "",
                        contactNoFormated: "",
                        invoiceClosingDate: '',
                        invoicePaymentDate: '',
                        paymentMode: []
                    },
                    accountInfo: {
                        companyId: eachCompany.companyId,
                        bankAccountId: '',
                        bankName: '',
                        branchName: '',
                        accountNumber: '',
                        accountName: '',
                    },
                    otherBankAccountInfo: {
                        companyId: '',
                        bankAccountId: '',
                        bankName: '',
                        branchName: '',
                        accountNumber: '',
                        accountName: '',
                    },
                    accountType: 'savedAccount',
                    assignedRoles: '',
                    companyBusinessCategory: eachCompany.companyBusinessCategory,
                    companyRoleSelection: [false, false, false],
                    isApprovalDone: false,
                    personInchargeEmail: '',
                    companyCategorySelection: JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory)),
                    roleIndex: -1,
                    paymentMethodSelection: AppConstant.AGREEMENT_PARTNER_PAYMENT_METHOD,
                    bankPayment: true
                }

                if (newPartnerCompany.companyBusinessCategory) {

                    var companyCategorys: string = JSON.stringify(newPartnerCompany.companyBusinessCategory);

                    newPartnerCompany.companyCategorySelection.forEach((eachCategory, index) => {
                        if (newPartnerCompany.assignedRoles && eachCategory.title == newPartnerCompany.assignedRoles) {
                            newPartnerCompany.companyRoleSelection[index] = true;
                            // this.selectedAgreement.dumperPartnerInfo.companyCategorySelection[index].isSelected = true;

                        }

                        if (!companyCategorys.includes(eachCategory.title)) {
                            newPartnerCompany.companyCategorySelection[index].isDisable = false;
                        }
                    });

                    // newPartnerCompany.companyRoleSelection = this.businessAgreementService.prepareCompanyBusinessCategorySelectionModel(newPartnerCompany.companyBusinessCategory);

                }
                // newPartnerCompany.companyBusinessCategory = Object.assign([], eachCompany.companyBusinessCategory);
                partnerList.push(newPartnerCompany);

            }
        }
        // }

        return partnerList;
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );


    updateSelectedItemList(item: any, event: any) {

        let isHandled = false;
        if (event.stopPropagation) {
            event.stopPropagation();
            isHandled = true;
        }
        if (event.preventDefault) {
            event.preventDefault();
            isHandled = true;
        }
        if (item.isSelected) {
            item.isSelected = false;
        } else {
            item.isSelected = true;
        }

        var itemIndex: number = this.selectedPartnerList.findIndex(each => each.companyId == item.companyId);

        var mainListItemIndex: number = this.dxrCompanyViewList.findIndex(each => each.companyId == item.companyId);
        if (mainListItemIndex >= 0) {
            this.dxrCompanyViewList[mainListItemIndex].isSelected = item.isSelected;
        }

        if (item.isSelected && itemIndex < 0 && this.selectedPartnerList.length < AppConstant.MAX_AGREEMENT_PARTNER) {
            this.selectedPartnerList.push(JSON.parse(JSON.stringify(item)));

        } else if (!item.isSelected && itemIndex >= 0) {
            this.selectedPartnerList.splice(itemIndex, 1);

        } else if (item.isSelected && itemIndex < 0 && this.selectedPartnerList.length >= AppConstant.MAX_AGREEMENT_PARTNER) {
            var companyIndexInView = this.dxrCompanyViewList.findIndex(eachCompany => eachCompany.companyId == item.companyId);
            if (companyIndexInView >= 0) {
                this.dxrCompanyViewList[companyIndexInView].isSelected = false;
            }

            this.selectingMoreThanTwoCompany = true;
        }
    }

}
