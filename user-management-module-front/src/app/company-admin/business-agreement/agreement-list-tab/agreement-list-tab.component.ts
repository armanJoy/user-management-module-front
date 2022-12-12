import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { PartnerInfo, AgreementInfo, AgreementFilter, OwnApprovalStatus } from 'src/app/models/backend-fetch/business-agreement';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { MatDialog } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { AgreementTabComponent } from '../agreement-tab/agreement-tab.component';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { CookieService } from 'ngx-cookie-service';
import { BusinessAgreementService } from 'src/app/services/operation-services/dumper-admin/business-agreement.service';
import { CompanySettingsTabsComponent } from '../../company-settings/company-settings-tabs/company-settings-tabs.component';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { DeleteConfirmationComponent } from 'src/app/common-directives/delete-confirmation/delete-confirmation.component';

@Component({
    selector: 'app-business-agreement-list-tab',
    templateUrl: './agreement-list-tab.component.html',
    styleUrls: ['./agreement-list-tab.component.css']
})
export class BusinessAgreementListTabComponent implements OnInit {

    @Input()
    getAgreementList!: (companyId: string, pageNo: number, searchText: string, status: string, flag: boolean, callBack: any) => void;

    @Input()
    filterItems!: AgreementFilter[];

    @Input()
    agreementProcessDef!: any[];

    @Input()
    companyInfo!: PartnerInfo;

    @Input()
    agreementList!: AgreementInfo[];

    @Input()
    editAgreement!: (selectedAgreement?: AgreementInfo, selectedProcess?: any) => void;

    @Input()
    selectedOperationFilter!: AgreementFilter;

    // @Input()
    //     this.showProgressBar :

    constructor(private breakpointObserver: BreakpointObserver, private matDialog: MatDialog, private cookieService: CookieService, private businessAgreementService: BusinessAgreementService, private utilService: UtilService, private languageService: LanguageService) { }

    uiLabels: any = {
        "headerLabel": "Agreement List",
        "createButton": "Create Agreement",
        "agreementTitle": "Title",
        "createDate": "Create Date",
        "viewBtn": "View",
        "editButton": "Edit",
        "validDate": "Valid Date",
        "dumperCompany": "Dumper Company",
        "transporterCompany": "Transporter Company",
        "processorCompany": "Processor Company",
        "status": "Status",
        "filterLabel": "Filter",
        "creatorLabel": "Creator",
        "partnerApprovalStatus": "Approval"
    }

    statusFilterModel: string = AppConstant.AGREEMENT_INITIALLY_SELECTED_STATUS;

    hideAgreementOperationFilterDropdown = AppConstant.HIDE_AGREEMENT_OPERATION_FILTER_DROPDOWN;

    isApproved: boolean = false;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    dumperCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.DUMPER_CATEGORY_VALUE_ID);
    transporterCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.TRANSPOTER_CATEGORY_VALUE_ID);
    processorCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.PROCESSOR_CATEGORY_VALUE_ID);

    statusTemporaryUse = AppConstant.SUBSCRIPTION_TEMPORARY_COMPANY_STATUS;

    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.AGREEMENT_LIST_TAB, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.AGREEMENT_LIST_TAB;
    }

    pageSize: number = AppConstant.DXR_LIST_VIEW_PAGE_SIZE;
    dataEndsLabel: string = AppConstant.Data_Ends_Label;

    showProgressBar: boolean = false;
    searchByText() {
        this.showProgressBar = true;
        var pageNo: number = JSON.parse(JSON.stringify(this.utilService.getPageNo()));
        var searchText: string = JSON.parse(JSON.stringify(this.utilService.getSearchText()));

        if (!searchText) {
            searchText = '';
        }

        if (!pageNo) {
            pageNo = 0;
        }
        // var status: string = this.utilService.getFilterItemIdsForSearch(JSON.parse(JSON.stringify(this.selectedOperationFilter.statusList)), 'isSelected', true, 'statusId');

        this.selectedOperationFilter.statusList.forEach(each => {
            each.isSelected = (each.statusId == this.statusFilterModel) ? true : false;
        })

        var status: string = this.statusFilterModel;

        // var agreementTabsComp: BusinessPartnerTabsComponent = new BusinessPartnerTabsComponent(this.cookieService, this.businessAgreementService, this.utilService, this.languageService);

        // agreementTabsComp.getAgreementList(this.companyInfo.companyId, pageNo, searchText, status);

        // this.search(companyId, pageNo, searchText, status, true);
        this.getAgreementList(this.companyInfo.companyId, pageNo, searchText, status, false, () => {
            this.showProgressBar = false;
        });

    }

    prepareAgreementBasicInfo(agreement: AgreementInfo, panel: any, event: any) {

        // this.utilService.stopEventPropagation(event);
        if (agreement && !agreement.isBasicInfoFetched) {

            this.businessAgreementService.getAgreementBasicInfo(agreement.agreementId).subscribe(eachAgreement => {
                if (eachAgreement) {
                    var ownApprovalStatus: OwnApprovalStatus = {
                        agreementId: eachAgreement.agreementId,
                        companyId: this.companyInfo.companyId,
                        isApproved: false
                    }
                    this.businessAgreementService.getOwnApprovalStatus(ownApprovalStatus, (data: OwnApprovalStatus) => {
                        if (data) {
                            agreement = this.businessAgreementService.prepareAgreementForView(eachAgreement, this.agreementProcessDef, this.companyInfo.companyId, data.isApproved);
                            agreement.isBasicInfoFetched = true;
                            agreement.isOpen = true;

                            var index = this.agreementList.findIndex(item => item.agreementId == agreement.agreementId);

                            if (index >= 0) {
                                this.agreementList[index] = agreement;
                            }
                        }
                    });
                }
            })


        } else {
            agreement.isOpen = (agreement.isOpen) ? false : true;
        }
    }



    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    switchToAgreementTab(agreement?: AgreementInfo, selectedProcess?: any) {

        this.editAgreement(agreement, selectedProcess);
    }

    viewAgreementInfo(item: AgreementInfo) {

        const agreementViewPopup = this.matDialog.open(AgreementTabComponent, {
            width: '75%',
            height: '75%',
            data: {
                isViewMode: true,
                companyInfo: this.companyInfo,
                selectedAgreement: item
            }
        })
    }


    openPartnerDetailsPopup(partnerInfo: any) {
        const dialog = this.matDialog.open(CompanySettingsTabsComponent, {
            width: '75%',
            height: '75%',
            data: partnerInfo.companyId
        });
    }

    copyAgreement(agreement: AgreementInfo) {
        var copiedAgreement: AgreementInfo = JSON.parse(JSON.stringify(agreement));

        copiedAgreement.agreementId = this.utilService.generateUniqueId();
        if (copiedAgreement.agreementWasteTransportInfo) {
            copiedAgreement.agreementWasteTransportInfo.forEach(each => {
                each.agreementWasteTransportInfoId = this.utilService.generateUniqueId();
            })
        } else {
            copiedAgreement.agreementWasteTransportInfo = [];
        }

        if (copiedAgreement.agreementWasteProcessInfo) {
            copiedAgreement.agreementWasteProcessInfo.forEach(each => {
                each.agreementWasteProcessInfoId = this.utilService.generateUniqueId();
            })
        } else {
            copiedAgreement.agreementWasteProcessInfo = [];
        }

        if (copiedAgreement.partnerList) {
            copiedAgreement.partnerList.forEach(each => {
                each.agreementPartnerInfoId = this.utilService.generateUniqueId();
            })
        } else {
            copiedAgreement.partnerList = [];
        }

        this.editAgreement(copiedAgreement);
    }

    removeAgreement(itemId: string) {
        var removeTriggerData: RemoveTriggerData = {
            itemeId: itemId,
            triggerUserId: this.utilService.getUserIdCookie(),
            triggerCompanyId: this.utilService.getCompanyIdCookie(),
            removeOperationType: AppConstant.AGREEMENT_REMOVE_OPERATION
        }

        const removeDialog = this.matDialog.open(DeleteConfirmationComponent, {
            width: '40%',
            // height: '30%',
            // data: forwardLinks,
            disableClose: true
        });

        removeDialog.afterClosed().subscribe(response => {
            if (response) {
                this.businessAgreementService.removeAgreement(removeTriggerData).subscribe(response => {
                    if (response) {
                        this.utilService.showRemovedToast();
                        this.removeAgreementFromViewList(itemId);

                    }
                });
            }
        });
    }

    removeAgreementFromViewList(agreementId: string) {
        var index = this.agreementList.findIndex(item => item.agreementId == agreementId);

        if (index >= 0) {
            this.agreementList.splice(index, 1);
        }
    }
}
