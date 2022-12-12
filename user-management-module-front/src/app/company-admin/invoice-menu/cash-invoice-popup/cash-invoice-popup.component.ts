import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { InvoiceService } from 'src/app/services/operation-services/invoice.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { BusinessAgreementService } from 'src/app/services/operation-services/dumper-admin/business-agreement.service';
import { CompanyInfoUpdate } from 'src/app/models/backend-update/company-settings-update';
import { MenifestoInfo } from 'src/app/models/backend-fetch/menifesto';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-cash-invoice-popup',
    templateUrl: './cash-invoice-popup.component.html',
    styleUrls: ['./cash-invoice-popup.component.css']
})
export class CashInvoicePopupComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService, public invoiceService: InvoiceService, private businessAgreementService: BusinessAgreementService, private dialogRef: MatDialogRef<CashInvoicePopupComponent>) { }

    viewContent = false;
    componentCode!: string;
    isSystemAdmin: boolean = false;

    uiLabels: any = {
        title: 'Cash Invoice',
        targerCompanyTab: 'Target Company',
        cashManifestTab: 'Cash Manifest',
        invoiceGenerateToast: 'Invoice Generated',
        noMenifestoSelectedToast: 'No Manifesto Selected'
    };

    selectedCompanyId: string = this.utilService.getCompanyIdCookie();
    selectedIndex: number = 0;
    comCategoryFilterString: string = "";
    dxrCompanyList: CompanyInfoUpdate[] = [];
    dxrCompanyViewList: any[] = [];
    targetedCompany: any;
    cashManifestoList: MenifestoInfo[] = [];
    companyId: string = '';

    ngOnInit(): void {
        debugger
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.CASH_INVOICE_POPUP;
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.companyId = this.utilService.getCompanyIdCookie();
        this.search();
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    onTabChange(event: any) {
        this.selectedIndex = event.index;
    }

    search = () => {
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
                    this.dxrCompanyViewList = this.prepareCompanyViewList(data);


                }

                if ((!this.targetedCompany || !this.targetedCompany.companyId) && this.dxrCompanyViewList && this.dxrCompanyViewList.length > 0) {
                    this.targetedCompany = this.dxrCompanyViewList[0];
                    this.getCashManifesto(this.companyId, this.targetedCompany.companyId, () => {
                        this.viewContent = true;
                    })

                } else {
                    this.viewContent = true;
                }


            })
        }
    }

    prepareCompanyViewList(allCompany: any[]) {
        var dxrCompanyViewList: any[] = [];
        allCompany.forEach(dxrCompany => {
            var eachCompanyViewItem: any = this.prepareCompanyViewItem(dxrCompany);

            dxrCompanyViewList.push(eachCompanyViewItem);
        });

        return dxrCompanyViewList;
    }

    prepareCompanyViewItem(dxrCompany: any) {
        var eachCompanyViewItem: any = JSON.parse(JSON.stringify(dxrCompany));
        eachCompanyViewItem.isSelected = false;
        eachCompanyViewItem.businessCategoryView = (dxrCompany.companyBusinessCategory) ? (dxrCompany.companyBusinessCategory.join(', ')) : '';
        eachCompanyViewItem.addressView = this.utilService.prepareZipCodeFormate(dxrCompany.zipcode) + ', ' + dxrCompany.companyAddress;
        eachCompanyViewItem.contactView = this.utilService.prepareContactNoFormate(dxrCompany.contactNo);

        return eachCompanyViewItem;
    }

    switchToCashManifestoTab = (agreementPartnerInfo: any) => {

        this.targetedCompany = agreementPartnerInfo;

        this.getCashManifesto(this.companyId, this.targetedCompany.companyId, () => {
            this.selectedIndex = 1;
        })

    }

    getCashManifesto(generatorComId: string, receiverComId: string, callBack: any) {
        this.invoiceService.getManifestoForCashInvoice(generatorComId, receiverComId).subscribe(response => {
            if (response) {
                this.cashManifestoList = response;
            }
            callBack();
        })
    }

    generateCashInvoice = (selectedManifestoIds: string[]) => {
        if (selectedManifestoIds && selectedManifestoIds.length > 0) {
            this.invoiceService.generateCashInvoice(selectedManifestoIds, this.companyId).subscribe(invoices => {
                if (invoices && invoices.length > 0) {
                    this.utilService.showSnackbar(this.uiLabels.invoiceGenerateToast, 3000);
                    this.dialogRef.close(invoices);
                } else {
                    this.dialogRef.close(null);
                }
            })
        } else {
            this.utilService.showSnackbar(this.uiLabels.noMenifestoSelectedToast, 3000);
        }

    }
}
