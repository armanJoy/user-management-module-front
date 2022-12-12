import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { Invoice } from 'src/app/models/backend-fetch/invoice';
import { InvoiceService } from 'src/app/services/operation-services/invoice.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { ConfirmationInvoiceStatusComponent } from '../confirmation-invoice-status/confirmation-invoice-status.component';
import { NotificationSetInfo } from 'src/app/models/backend-fetch/notification';
import { ActionConfirmationPopupComponent } from 'src/app/common-directives/action-confirmation-popup/action-confirmation-popup.component';
import { CashInvoicePopupComponent } from '../cash-invoice-popup/cash-invoice-popup.component';
@Component({
    selector: 'app-invoice-menu',
    templateUrl: './invoice-menu.component.html',
    styleUrls: ['./invoice-menu.component.css']
})
export class InvoiceMenuComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService, public invoiceService: InvoiceService, private matDialog: MatDialog) { }

    viewComponent = false;
    componentCode!: string;
    isSystemAdmin: boolean = false;

    invoiceList: Invoice[] = [];
    selectedCompanyId: string = this.utilService.getCompanyIdCookie();

    invoiceReportData: any;
    invoiceId!: string

    invoiceProcessDef: any[] = [];
    selectedProcess: any;
    notificationSetInfo: NotificationSetInfo = {
        contextId: "",
        companyId: "",
        baseTableId: "",
        trigerUserInfoId: "",
        status: {
            id: "",
            titleEng: "",
            titleJpn: ""
        }
    }

    companyId = this.utilService.getCompanyIdCookie();

    pageSize: number = AppConstant.DXR_LIST_VIEW_PAGE_SIZE;
    dataEndsLabel: string = AppConstant.Data_Ends_Label;

    paymentMethodFilter = AppConstant.PAYMENT_METHOD_FILTER;
    paymentFilterModel = AppConstant.PAYMENT_METHOD_FILTER[0].value;

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.INVOICE_MENU;

        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.INVOICE_MENU, AppConstant.UI_LABEL_TEXT);

        this.getInvoice(this.selectedCompanyId, AppConstant.INITIAL_PAGE_NO, AppConstant.INITIAL_SEARCH_TEXT, this.paymentFilterModel);
    }

    getInvoice(companyId: string, pageNo: number, searchText: string, paymentMethod: string) {
        this.invoiceService.getInvoiceInfoList(companyId, pageNo, searchText, paymentMethod).subscribe((invoice) => {
            if (invoice) {
                this.invoiceList = invoice;
                this.getProcessDef();

            }
            this.viewComponent = true;
        })
    }

    searchByText() {
        debugger

        var pageNo: number = JSON.parse(JSON.stringify(this.utilService.getPageNo()));
        var searchText: string = JSON.parse(JSON.stringify(this.utilService.getSearchText()));

        if (!searchText) {
            searchText = '';
        }

        if (!pageNo) {
            pageNo = 0;
        }

        this.getInvoice(this.selectedCompanyId, pageNo, searchText, this.paymentFilterModel);
    }

    generateInvoice(item: Invoice) {
        if (item) {
            this.invoiceId = item.invoiceId
            this.invoiceService.getInvoiceReportData(this.invoiceId);
        }
    }

    getProcessDef() {

        this.invoiceService.getInvoiceProcessDef().subscribe(data => {
            if (data) {
                this.invoiceProcessDef = data;
                this.selectedProcess = this.invoiceService.prepareProcessDefForView(this.invoiceProcessDef[0], this.selectedCompanyId);
            }
            // this.prepareFilterItems(Object.assign([], this.projectProcessDef));
            this.prepareInvoiceListView(this.invoiceList);
        })
    }

    prepareInvoiceListView(invoiceList: Invoice[]) {
        var count = 0;

        if (invoiceList && invoiceList.length > 0) {
            invoiceList.forEach(eachinvoice => {

                eachinvoice = this.invoiceService.prepareInvoiceForView(eachinvoice, this.invoiceProcessDef, this.companyId);

            });
        }
    }

    actionConfirmAndSave(eachProcess: any, currentStatus: string, invoiceProcessDef: any[]) {
        const confirmDialog = this.matDialog.open(ConfirmationInvoiceStatusComponent, {
            data: {
                currentStatus: currentStatus,
                newStatus: this.invoiceService.getStatusTitle(eachProcess.resultantStatusId, invoiceProcessDef),
                isApprovedByOtherParty: false
            },
        });

    }

    updateStatus(invoice: Invoice, eachProcess: any, callBack?: any) {

        if (eachProcess) {
            invoice.status.statusId = eachProcess.resultantStatusId;
        }
        this.invoiceService.updateInvoiceStatus(invoice).subscribe(data => {
            if (data) {

                invoice = this.invoiceService.prepareInvoiceForView(Object.assign({}, invoice), this.invoiceProcessDef, this.companyId);
                this.notificationSetInfo.status = this.invoiceService.getNotificationStatusInfo(invoice.status.statusId, this.invoiceProcessDef)
                this.saveNotification(invoice.invoiceId);
                this.updateInvoiceList(JSON.parse(JSON.stringify(invoice)));
                this.actionConfirmAndSave(eachProcess, invoice.status.statusTitle, this.invoiceProcessDef);
            }


        });
    }
    saveNotification(invoiceId: string) {
        this.notificationSetInfo.baseTableId = invoiceId;
        this.notificationSetInfo.contextId = AppConstant.INVOICE_NOTIFICAIONT_ID;
        this.notificationSetInfo.companyId = this.utilService.getCompanyIdCookie();
        this.notificationSetInfo.trigerUserInfoId = this.utilService.getUserIdCookie();
        this.invoiceService.sendNotification(this.notificationSetInfo).subscribe(data => {

        })
    }

    updateInvoiceList(invoice: Invoice) {

        var index = -1;
        index = this.invoiceList.findIndex(item => item.invoiceId == invoice.invoiceId);
        if (index >= 0) {
            this.invoiceList[index] = invoice;
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

    // get sortInvoiceList() {

    //     return this.invoiceList.sort((a, b) => (a.backendDate < b.backendDate) ? 1 : -1);

    // }



    uiLabels: any = {
        "listHeader": "Invoice List",
        "date": "Invoice Date",
        "invoiceNo": "Invoice No",
        "billAmount": "Bill Amount",
        "generatorCompanyName": "Generator Company",
        "receiveCompanyName": "Receive Company",
        "status": "Status",
        "generatorBtn": "Generate"
    }

    triggerInvoiceGenerator() {
        var companyId: string = this.utilService.getCompanyIdCookie();

        const confirmationDialog = this.matDialog.open(ActionConfirmationPopupComponent, {
            width: '500px',
            height: '300px',
            data: {
                header: this.uiLabels.header,
                message: this.uiLabels.message,
                confirmButtonLabel: this.uiLabels.confirmButtonLabel,
                cancelButtonLabel: this.uiLabels.cancelButtonLabel
            }
        });

        confirmationDialog.afterClosed().subscribe(response => {
            if (response) {
                this.invoiceService.triggerInvoiceGenerator(companyId).subscribe(response => {
                    if (response && response == AppConstant.SUCCESS_RESPONSE_FROM_BACKEND) {
                        this.utilService.showSnackbar(this.uiLabels.invoiceGenerateToast, 2000);
                        this.searchByText();
                        setTimeout(() => { this.utilService.showSnackbar(this.uiLabels.fetchingNewInvoiceToast, 2000) }, 3000);

                    } else {
                        this.utilService.showSnackbar(this.uiLabels.manifestoNoFoundToGenerateManifestoToast, 3000);
                    }
                });
            }
        })


    }

    openCashInvoicePopup() {
        const cashInvoicePopup = this.matDialog.open(CashInvoicePopupComponent,
            {
                width: '75%',
                height: '75%'
            }
        );

        cashInvoicePopup.afterClosed().subscribe(response => {
            this.paymentFilterModel = AppConstant.PAYMENT_METHOD_FILTER[1].value;
            this.utilService.setPageNo(0);
            this.searchByText();
        })
    }
}
