import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { Invoice, OwnApprovalStatus } from 'src/app/models/backend-fetch/invoice';
import { environment } from 'src/environments/environment';
import { LanguageService } from '../visitor-services/language.service';
import { UriService } from '../visitor-services/uri.service';
import { NotificationSetInfo, StatusInfo } from 'src/app/models/backend-fetch/notification';
import { MenifestoInfo } from 'src/app/models/backend-fetch/menifesto';
@Injectable({
    providedIn: 'root'
})
export class InvoiceService {

    BASE_URL: string = environment.serverUrl;

    constructor(private httpClient: HttpClient, private uriService: UriService, private languageService: LanguageService) { }

    public generateCashInvoice(manifestoForCashInvoice: string[], generatorComId: string): Observable<Invoice[]> {
        var url = '/invoice/generate-cash-invoice';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, { manifestoForCashInvoice, generatorComId });
    }

    public getManifestoForCashInvoice(generatorComId: string, receiverComId: string): Observable<MenifestoInfo[]> {

        var url = '/invoice/get-cash-manifesto';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, { generatorComId, receiverComId });
    }

    public sendNotification(NotificationSetInfo: NotificationSetInfo): Observable<any> {

        var url = '/invoice/invoice-notification';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, NotificationSetInfo);
    }

    getNotificationStatusInfo(statusId: string, agreementProcessDef: any[]): StatusInfo {
        var statusInfo: StatusInfo = {
            id: "",
            titleEng: "",
            titleJpn: "",
        }
        // var statusTitleValue = '';
        if (agreementProcessDef) {

            agreementProcessDef.forEach(eachProcess => {
                if (eachProcess.initialStatus) {
                    eachProcess.initialStatus.forEach((element: any) => {
                        if (element.statusId == statusId) {
                            statusInfo.id = element.statusId;
                            statusInfo.titleEng = element.statusTitleEng;
                            statusInfo.titleJpn = element.statusTitleJpn;



                        }
                    });
                }
            })
        }

        return statusInfo;
    }

    public getInvoiceInfoList(companyId: string, pageNo: number, searchText: string, paymentMethod: string): Observable<Invoice[]> {
        var url = '/invoice/get-invoice';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId, pageNo, searchText, paymentMethod);
    };

    public getInvoiceReportData(invoiceId: string) {
        var url = this.BASE_URL + '/invoice/get-invoice-report-data';
        var header: any = this.uriService.getHttpOptions();
        header.responseType = 'blob';
        this.httpClient.post(url, invoiceId, header).subscribe((res) => {
            if (res) {
                let blob = new Blob([res], { type: 'application/pdf' });
                let pdfUrl = window.URL.createObjectURL(blob);

                var PDF_link = document.createElement('a');
                PDF_link.href = pdfUrl;

                //   TO OPEN PDF ON BROWSER IN NEW TAB
                window.open(pdfUrl, '_blank');
                //   TO DOWNLOAD PDF TO YOUR COMPUTER
                // PDF_link.download = "TestFile.pdf";
                // PDF_link.click();
            }
        })

    }

    processTitle = (this.languageService.getSelectedLanguageIndex() == AppConstant.LANG_INDEX_ENG) ? AppConstant.PROCESS_TITLE_KEY_ENG : AppConstant.PROCESS_TITLE_KEY_JPN;

    actionTitle = (this.languageService.getSelectedLanguageIndex() == AppConstant.LANG_INDEX_ENG) ? AppConstant.ACTION_TITLE_KEY_ENG : AppConstant.ACTION_TITLE_KEY_JPN;

    statusTitle = (this.languageService.getSelectedLanguageIndex() == AppConstant.LANG_INDEX_ENG) ? AppConstant.STATUS_TITLE_KEY_ENG : AppConstant.STATUS_TITLE_KEY_JPN;

    getStatusTitle(statusId: string, invoiceProcessDef: any[]) {
        var statusTitleValue = '';
        if (invoiceProcessDef) {
            invoiceProcessDef.forEach(eachProcess => {
                if (eachProcess.initialStatus) {
                    eachProcess.initialStatus.forEach((element: any) => {
                        if (element.statusId == statusId) {

                            statusTitleValue = element[this.statusTitle];

                        }
                    });
                }
            })
        }

        return statusTitleValue;
    }

    updateInvoiceStatus(invoice: Invoice): Observable<Invoice> {
        var url = '/invoice/update-invoice-status';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, invoice);
    }

    prepareProcessDefForView(processDef: any, companyId: string) {
        processDef.processTitle = processDef[this.processTitle];
        processDef.companyId = companyId;
        processDef.viewMode = false;
        if (processDef.processAction) {
            processDef.processAction.forEach((eachAction: any) => {
                eachAction.actionTitle = eachAction[this.actionTitle];
            });
        }

        return processDef;
    }

    prepareInvoiceForView(eachInvoice: Invoice, invoiceProcessDef: any[], companyId: string) {

        eachInvoice.processsList = this.prepareInvoiceProcessButtons(Object.assign({}, eachInvoice), invoiceProcessDef, companyId);

        eachInvoice.status.statusTitle = this.getStatusTitle(eachInvoice.status.statusId, invoiceProcessDef);

        return eachInvoice;
    }

    prepareInvoiceProcessButtons(invoice: Invoice, invoiceProcessDef: any[], companyId: string) {
        var processsList: any[] = [];
        if (invoiceProcessDef) {

            invoiceProcessDef.forEach(eachProcess => {
                if (eachProcess.initialStatus) {
                    eachProcess.initialStatus.forEach((element: any) => {
                        if (element.statusId == invoice.status.statusId) {

                            if (eachProcess.processAction) {
                                eachProcess.processAction.forEach((eachAction: any) => {
                                    eachAction.actionTitle = eachAction[this.actionTitle];
                                });
                            }

                            if (invoice.generatorCompInfo.companyId == companyId && eachProcess.partyAccess != AppConstant.INVOICE_PROCESS_ACCESS_NONE) {

                                var creatorProcessDef: any = Object.assign({}, eachProcess);

                                creatorProcessDef.processTitle = creatorProcessDef[this.processTitle];
                                creatorProcessDef.companyId = companyId;

                                if (eachProcess.creatorAccess == AppConstant.PROJECT_PROCESS_ACCESS_VIEW) {
                                    creatorProcessDef.viewMode = true;
                                } else {
                                    creatorProcessDef.viewMode = false;
                                }

                                processsList.push(creatorProcessDef);

                            } else if (invoice.receiveCompInfo.companyId == companyId && eachProcess.creatorAccess != AppConstant.INVOICE_PROCESS_ACCESS_NONE) {

                                var partyProcessDef: any = Object.assign({}, eachProcess);

                                partyProcessDef.processTitle = partyProcessDef[this.processTitle];
                                partyProcessDef.companyId = companyId;

                                if (eachProcess.partyAccess == AppConstant.PROJECT_PROCESS_ACCESS_VIEW) {
                                    partyProcessDef.viewMode = true;
                                } else {
                                    partyProcessDef.viewMode = false;
                                }

                                processsList.push(partyProcessDef);

                            }

                        }
                    });
                }
            })
        }

        return processsList;
    }

    getOwnApprovalStatus(ownApprovalStatus: OwnApprovalStatus, callBack: any) {
        this.getApprovalStatus(ownApprovalStatus).subscribe(data => {
            if (data) {

            }
            callBack(data);

        });
    }

    getApprovalStatus(invoiceStatusUpdate: OwnApprovalStatus): Observable<OwnApprovalStatus> {
        var url = '/invoice/own-approval-status';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, invoiceStatusUpdate);
    }

    getInvoiceProcessDef(): Observable<any[]> {
        var url = '/invoice/get-invoice-process-def';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    }

    triggerInvoiceGenerator(companyId: string): Observable<string> {
        var url = '/invoice/generate-invoice';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
    }
}
