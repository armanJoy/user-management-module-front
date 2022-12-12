import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { PartnerInfo, AgreementInfo, SubsctiptionInvitation } from 'src/app/models/backend-fetch/business-agreement';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { CompanySettingsTabsComponent } from 'src/app/company-admin/company-settings/company-settings-tabs/company-settings-tabs.component';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { BusinessAgreementService } from 'src/app/services/operation-services/dumper-admin/business-agreement.service';
import { SubscriptionFormComponent } from 'src/app/visitor/subscription/subscription-form/subscription-form.component';
import { CompanyInvitationPopupComponent } from '../company-invitation-popup/company-invitation-popup.component';
import { BusinessPartnerTabsComponent } from '../business-partner-tabs/business-partner-tabs.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-partner-list-tab',
    templateUrl: './partner-list-tab.component.html',
    styleUrls: ['./partner-list-tab.component.css']
})
export class PartnerListTabComponent implements OnInit {

    @Input()
    companyInfo!: PartnerInfo;

    @Input()
    partnerList!: PartnerInfo[];

    @Input()
    getCompanyPartnerFromSearch!: (companyId: string, pageNo: number, searchText: string, status: string) => void;

    constructor(private breakpointObserver: BreakpointObserver, private matDialog: MatDialog, private languageService: LanguageService, private utilService: UtilService, private businessAgreementService: BusinessAgreementService, private cookieService: CookieService) { }

    uiLabels: any = {
        sendSubscriptionRequest: "Send Subscription Request",
        headerLabel: "Partner List",
        companyName: 'Name',
        addressLabel: 'Address',
        viewBtn: 'View',
        contactLabel: 'Contact No',
        personInChargeLabel: 'Person In Charge',
        paymentMethodLabel: 'Payment Method',
        businessTypeLabel: 'Business Type',
        filterLabel: "Filter",
        companyInvitation: 'Company Invitation',
        subscriptionForm: "Subscription Form"
    };

    componentCode!: string;
    isSystemAdmin: boolean = false;
    companyCategories: any[] = [];

    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.PARTNER_LIST_TAB, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.PARTNER_LIST_TAB;
        this.companyCategories = this.businessAgreementService.prepareCompanyCategoryFilterItem();
    }

    pageSize: number = AppConstant.DXR_LIST_VIEW_PAGE_SIZE;
    dataEndsLabel: string = AppConstant.Data_Ends_Label;

    searchByText() {

        var pageNo: number = JSON.parse(JSON.stringify(this.utilService.getPageNo()));
        var searchText: string = JSON.parse(JSON.stringify(this.utilService.getSearchText()));

        if (!searchText) {
            searchText = '';
        }

        if (!pageNo) {
            pageNo = 0;
        }

        var status: string = this.utilService.getFilterItemIdsForSearch(this.companyCategories, 'isSelected', true, 'title');

        // var agreementTabsComp: BusinessPartnerTabsComponent = new BusinessPartnerTabsComponent(this.cookieService, this.businessAgreementService, this.utilService, this.languageService);

        this.getCompanyPartnerFromSearch(this.companyInfo.companyId, pageNo, searchText, status.toLowerCase());
    }



    // getCompanyPartner(companyId: string, pageNo: number, searchText: string, status: string) {
    //     if (companyId) {

    //         this.businessAgreementService.getPartnerList(companyId, pageNo, searchText, status).subscribe(data => {
    //             if (data) {

    //                 this.partnerList = this.businessAgreementService.preparePartnerViewList(data);
    //             }
    //         });
    //     }
    // }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    openPartnerDetailsPopup(partnerInfo: PartnerInfo) {
        const dialog = this.matDialog.open(CompanySettingsTabsComponent, {
            width: '75%',
            height: '75%',
            data: partnerInfo.companyId
        });
    }

    openSubscriotiuonFormPopup() {
        const dialog = this.matDialog.open(SubscriptionFormComponent, {
            width: '65%',
            height: '75%',

        });
    }

    openCompanyInvitationDiolog(companyInfo: PartnerInfo): void {
        const sampleDialog = this.matDialog.open(CompanyInvitationPopupComponent, {
            width: '75%',
            height: '40%',
            data: companyInfo,
            // disableClose: true
        });
        sampleDialog.afterClosed().subscribe(result => {
            if (result) {
                this.businessAgreementService.sendCompanyInvitation(result).subscribe((data) => {
                    if (data) {
                        alert("Invitation Send Successfully");
                    }
                })

            }

        });
    }

}
