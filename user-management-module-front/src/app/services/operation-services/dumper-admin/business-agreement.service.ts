import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { UriService } from '../../visitor-services/uri.service';
import { AppConstant } from 'src/app/config/app-constant';
import { PartnerInfo, AgreementInfo, SubsctiptionInvitation, AgreementPartnerInfo, AgreementStatusUpdate, OwnApprovalStatus, AgreementFilter, CompanyInvitation, AgreementInfoUpdate, AgreementWasteProcessInfo, AgreementWasteTransportInfo, AgreementInvoiceWasteInfo, AgreementWasteTransportInfoSelectionView } from 'src/app/models/backend-fetch/business-agreement';
import { AccountantInfo, BankAccountInfo, DxrWasteInfoFetch } from 'src/app/models/backend-fetch/company-settings-fetch';
import { UserInfoFetch } from 'src/app/models/backend-fetch/user-management-fetch';
import { CompanyInfoUpdate } from 'src/app/models/backend-update/company-settings-update';
import { ControlValidation, ValidationMessage, ValidationReport } from 'src/app/models/view/validation-models';
import { LanguageService } from '../../visitor-services/language.service';
import { UtilService } from '../../visitor-services/util.service';
import { MatDialog } from '@angular/material/dialog';
import { AgreementActionConfirmPopupComponent } from 'src/app/company-admin/agreement-action-confirm-popup/agreement-action-confirm-popup.component';
import { ProjectFilter, ProjectStatusFilter } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { NotificationSetInfo, StatusInfo } from 'src/app/models/backend-fetch/notification';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
@Injectable({
    providedIn: 'root'
}
)
export class BusinessAgreementService {

    constructor(private uriService: UriService, private languageService: LanguageService, private utilService: UtilService, private matDialog: MatDialog) { }

    prepareWateProcessingInfoList(agreementWasteTransportInfoList: AgreementWasteTransportInfo[], agreementWasteProcessInfoItems: AgreementWasteProcessInfo[]) {
        var prepareAgreementWasteProcessInfoItems: AgreementWasteProcessInfo[] = JSON.parse(JSON.stringify(agreementWasteProcessInfoItems));
        if (agreementWasteTransportInfoList) {

            agreementWasteTransportInfoList.forEach(agreementWasteTransportInfo => {
                var agreementWasteProcessInfo: AgreementWasteProcessInfo = this.prepareWasteProcessingInfoFromTransportInfo(agreementWasteTransportInfo);

                if (prepareAgreementWasteProcessInfoItems && prepareAgreementWasteProcessInfoItems.length > 0) {

                    let itemIndex = prepareAgreementWasteProcessInfoItems.findIndex(item => item.wasteDefId == agreementWasteProcessInfo.wasteDefId);

                    if (itemIndex < 0) {
                        prepareAgreementWasteProcessInfoItems.unshift(agreementWasteProcessInfo);
                    }

                } else {
                    prepareAgreementWasteProcessInfoItems.unshift(agreementWasteProcessInfo);
                }
            });

        }

        return prepareAgreementWasteProcessInfoItems;


    }

    getInvoiceGeneratorCompanys(agreement: AgreementInfo) {
        return this.getAgreementPartners(agreement).filter(item => item.companyId != agreement.invoiceReceiverComId);
    }

    getInvoiceReceiverCompany(agreement: AgreementInfo) {
        return this.getAgreementPartners(agreement).find(item => item.companyId == agreement.invoiceReceiverComId);
    }

    prepareInvoiceWasteInfoList(selectedAgreement: AgreementInfo) {
        var agreementInvoiceWasteList: AgreementInvoiceWasteInfo[] = [];
        var agreementWasteTransportInfoList: AgreementWasteTransportInfo[] = JSON.parse(JSON.stringify(selectedAgreement.agreementWasteTransportInfo));

        if (agreementWasteTransportInfoList && selectedAgreement.invoiceReceiverComId) {

            agreementWasteTransportInfoList.forEach(agreementWasteTransportInfo => {
                var invoiceGeneratorCompanys: AgreementPartnerInfo[] = this.getInvoiceGeneratorCompanys(selectedAgreement);
                var sumTransportAndProcessPrice: boolean = (selectedAgreement.partnerList.length == 2) ? false : (selectedAgreement.partnerList.length == 1 && selectedAgreement.isTransportPriceApply && selectedAgreement.isProcessingPriceApply) ? true : false;
                var invoiceReceiver: any = this.getInvoiceReceiverCompany(selectedAgreement);

                if (invoiceGeneratorCompanys && invoiceReceiver) {
                    invoiceGeneratorCompanys.forEach(eachGeneratorCom => {
                        var operationType = (eachGeneratorCom.assignedRoles == AppConstant.CATEGORY_NAME_TRANSPORTER) ? AppConstant.TRANSPORTER_INVOICE : AppConstant.PROCESSOR_INVOICE;
                        var agreementInvoiceWasteInfo: AgreementInvoiceWasteInfo = this.prepareAgreementInvoiceWasteInfo(agreementWasteTransportInfo, operationType, eachGeneratorCom, invoiceReceiver, sumTransportAndProcessPrice, selectedAgreement);

                        agreementInvoiceWasteList.unshift(agreementInvoiceWasteInfo);
                    });
                }

            });

        }

        return agreementInvoiceWasteList;
    }

    getProcessingPrice(wasteId: string, selectedAgreement: AgreementInfo): number {
        var processingPrice: number = 0;

        processingPrice = selectedAgreement.agreementWasteProcessInfo.find(item => item.wasteDefId == wasteId)!.price;

        return processingPrice;
    }

    prepareAgreementInvoiceWasteInfo(agreementWasteTransportInfo: AgreementWasteTransportInfo, operationType: string, generator: AgreementPartnerInfo, receiver: AgreementPartnerInfo, sumTransportAndProcessPrice: boolean, agreementInfo: AgreementInfo): AgreementInvoiceWasteInfo {

        var price: number = (sumTransportAndProcessPrice) ? (agreementWasteTransportInfo.price + this.getProcessingPrice(agreementWasteTransportInfo.wasteDefId, agreementInfo)) : ((operationType == AppConstant.TRANSPORTER_INVOICE) ? agreementWasteTransportInfo.price : this.getProcessingPrice(agreementWasteTransportInfo.wasteDefId, agreementInfo));

        var priceSuffix: string = (sumTransportAndProcessPrice) ? ('T-' + agreementWasteTransportInfo.price + ', P-' + this.getProcessingPrice(agreementWasteTransportInfo.wasteDefId, agreementInfo)) : ((operationType == AppConstant.TRANSPORTER_INVOICE) ? ('T-' + agreementWasteTransportInfo.price) : ('P-' + this.getProcessingPrice(agreementWasteTransportInfo.wasteDefId, agreementInfo)));

        var agreementWasteProcessInfo: AgreementInvoiceWasteInfo = {
            agreementInvoiceWasteInfoId: '',
            wasteDefId: agreementWasteTransportInfo.wasteDefId,
            wasteCategoryId: agreementWasteTransportInfo.wasteCategoryId,
            wasteTitle: agreementWasteTransportInfo.wasteTitle,
            wasteCategoryTitle: agreementWasteTransportInfo.wasteCategoryTitle,
            pickZipCode: agreementWasteTransportInfo.pickZipCode,
            pickAddress: agreementWasteTransportInfo.pickAddress,
            dropZipCode: agreementWasteTransportInfo.dropZipCode,
            dropAddress: agreementWasteTransportInfo.dropAddress,
            price: price,
            unit: agreementWasteTransportInfo.unit,
            agreementId: agreementInfo.agreementId,
            priceSuffix: priceSuffix,
            operationType: operationType,
            invoiceGenerator: generator.companyId,
            invoiceGeneratorName: generator.companyName,
            invoiceReceiver: receiver.companyId,
            invoiceReceiverName: receiver.companyName,
            bankPayment: generator.bankPayment
        };

        return agreementWasteProcessInfo;
    }

    prepareAgreementWasteTrasnportInfo(agreementInvoiceWasteInfo: AgreementInvoiceWasteInfo) {
        var agreementTransportWasteInfo: AgreementWasteTransportInfo = {
            agreementWasteTransportInfoId: this.utilService.generateUniqueId(),
            wasteDefId: agreementInvoiceWasteInfo.wasteDefId,
            wasteCategoryId: agreementInvoiceWasteInfo.wasteCategoryId,
            wasteTitle: agreementInvoiceWasteInfo.wasteTitle,
            wasteCategoryTitle: agreementInvoiceWasteInfo.wasteCategoryTitle,
            pickZipCode: agreementInvoiceWasteInfo.pickZipCode,
            pickAddress: agreementInvoiceWasteInfo.pickAddress,
            pickBrachId: "",
            dropZipCode: agreementInvoiceWasteInfo.dropZipCode,
            dropAddress: agreementInvoiceWasteInfo.dropAddress,
            dropBrachId: "",
            price: agreementInvoiceWasteInfo.price,
            unit: agreementInvoiceWasteInfo.unit,
        }

        return agreementTransportWasteInfo;
    }

    prepareWasteProcessingInfoFromTransportInfo(agreementWasteTransportInfo: AgreementWasteTransportInfo): AgreementWasteProcessInfo {
        var agreementWasteProcessInfo: AgreementWasteProcessInfo = {
            wasteDefId: agreementWasteTransportInfo.wasteDefId,
            wasteCategoryId: agreementWasteTransportInfo.wasteCategoryId,
            wasteTitle: agreementWasteTransportInfo.wasteTitle,
            wasteCategoryTitle: agreementWasteTransportInfo.wasteCategoryTitle,
            price: agreementWasteTransportInfo.price,
            unit: agreementWasteTransportInfo.unit,
            agreementWasteProcessInfoId: this.utilService.generateUniqueId()
        };

        return agreementWasteProcessInfo;
    }

    getAgreementPartners(selectedAgreement: AgreementInfo) {
        var partners: AgreementPartnerInfo[] = [];
        partners.unshift(selectedAgreement.dumperPartnerInfo);
        return partners.concat(selectedAgreement.partnerList)
    }

    processTitle = (this.languageService.getSelectedLanguageIndex() == AppConstant.LANG_INDEX_ENG) ? AppConstant.PROCESS_TITLE_KEY_ENG : AppConstant.PROCESS_TITLE_KEY_JPN;

    actionTitle = (this.languageService.getSelectedLanguageIndex() == AppConstant.LANG_INDEX_ENG) ? AppConstant.ACTION_TITLE_KEY_ENG : AppConstant.ACTION_TITLE_KEY_JPN;

    statusTitle = (this.languageService.getSelectedLanguageIndex() == AppConstant.LANG_INDEX_ENG) ? AppConstant.STATUS_TITLE_KEY_ENG : AppConstant.STATUS_TITLE_KEY_JPN;

    operationTitle = (this.languageService.getSelectedLanguageIndex() == AppConstant.LANG_INDEX_ENG) ? AppConstant.AGREEMENT_OPERATION_TITLE_ENG : AppConstant.AGREEMENT_OPERATION_TITLE_JPN;

    companyCategoryTitle = (this.languageService.getSelectedLanguageIndex() == AppConstant.LANG_INDEX_ENG) ? AppConstant.COMPANY_CATEGORY_TITLE_ENG : AppConstant.COMPANY_CATEGORY_TITLE_JPN;

    isValidAgreementTitle(agreementTitle: string, agreementId: string, callBack: any) {
        var companyId: string = this.utilService.getCompanyIdCookie();
        if (agreementTitle && agreementId) {
            this.validAgreementTitle(agreementId, agreementTitle, companyId).subscribe(backendResponse => {

                if (backendResponse && backendResponse.duplicateId) {
                    callBack(false)
                }
                else {
                    callBack(true)
                }
            });
        }
    }

    validAgreementTitle(agreementId: string, agreementTitle: string, companyId: string): Observable<any> {
        var url = "/agreement/check-duplicate-title";
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, { agreementId, agreementTitle, companyId });
    }

    removeAgreement(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/agreement/remove-agreement";
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }

    public sendNotification(NotificationSetInfo: NotificationSetInfo): Observable<any> {
        var url = '/agreement/agreement-notification';
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

    actionConfirmAndSave(processAction: any, currentStatus: string, agreementProcessDef: any[]) {
        const confirmDialog = this.matDialog.open(AgreementActionConfirmPopupComponent, {
            data: {
                currentStatus: currentStatus,
                newStatus: this.getStatusTitle(processAction.agreementStatusId, agreementProcessDef),
                isApprovedByOtherParty: false
            },
            // disableClose: true
        });

        // confirmDialog.afterClosed().subscribe(isConfirm => {
        //     callBack(isConfirm);
        // });
    }

    prepareAgreementAfterStatusUpdate(agreementStatusUpdate: AgreementStatusUpdate, selectedAgreement: AgreementInfo, agreementProcessDef: any[], companyId: string, callBack: any) {
        selectedAgreement.agreementStatus.statusId = agreementStatusUpdate.statusId;

        var ownApprovalStatus: OwnApprovalStatus = {
            agreementId: agreementStatusUpdate.agreementId,
            companyId: companyId,
            isApproved: false
        }

        this.getOwnApprovalStatus(ownApprovalStatus, (approvalStatus: OwnApprovalStatus) => {
            if (approvalStatus) {

                selectedAgreement.processsList = this.prepareAgreementProcessButtons(Object.assign({}, selectedAgreement), agreementProcessDef, companyId, approvalStatus.isApproved);

                selectedAgreement.agreementStatus.statusTitle = this.getStatusTitle(selectedAgreement.agreementStatus.statusId, agreementProcessDef);

                if (selectedAgreement.dumperPartnerInfo.companyId == companyId) {
                    selectedAgreement.dumperPartnerInfo.isApprovalDone = approvalStatus.isApproved;
                }

                if (selectedAgreement.transporterPartnerInfo.companyId == companyId) {
                    selectedAgreement.transporterPartnerInfo.isApprovalDone = approvalStatus.isApproved;
                }

                if (selectedAgreement.processorPartnerInfo.companyId == companyId) {
                    selectedAgreement.processorPartnerInfo.isApprovalDone = approvalStatus.isApproved;
                }

                selectedAgreement.partnerList.forEach(element => {
                    if (element.companyId == companyId) {
                        element.isApprovalDone = approvalStatus.isApproved;
                    }
                });

                callBack(selectedAgreement);

            }

        });
    }

    updateAgreementStatus(agreementInfoForSave: AgreementInfo, processAction: any, companyId: string, callBack?: any) {
        var agreementStatusUpdate: AgreementStatusUpdate = {
            agreementId: agreementInfoForSave.agreementId,
            statusId: processAction.agreementStatusId,
            isApprovalRequired: processAction.isApproval,
            requestedCompanyId: companyId,
            requestedCompanyType: '',
            isApproved: false,
        }

        this.saveAgreementStatus(agreementStatusUpdate).subscribe(data => {
            if (data) {
                callBack(data);

            }

            // if (callBack) {
            //     callBack(data);
            // } else {
            //     this.utilService.showSnackbar('Agreement Status Updated', 3000);

            //     this.selectedAgreement.agreementStatus.statusId = data.statusId;

            //     var ownApprovalStatus: OwnApprovalStatus = {
            //         agreementId: data.agreementId,
            //         companyId: companyId,
            //         isApproved: false
            //     }

            //     this.businessAgreementService.getOwnApprovalStatus(ownApprovalStatus, (approvalStatus: OwnApprovalStatus) => {
            //         if (approvalStatus) {

            //             this.selectedAgreement.processsList = this.businessAgreementService.prepareAgreementProcessButtons(Object.assign({}, this.selectedAgreement), this.agreementProcessDef, this.companyInfo.companyId, approvalStatus.isApproved);

            //             this.selectedAgreement.agreementStatus.statusTitle = this.businessAgreementService.getStatusTitle(this.selectedAgreement.agreementStatus.statusId, this.agreementProcessDef);

            //             if (this.selectedAgreement.dumperPartnerInfo.companyId == this.companyInfo.companyId) {
            //                 this.selectedAgreement.dumperPartnerInfo.isApprovalDone = approvalStatus.isApproved;
            //             }

            //             if (this.selectedAgreement.transporterPartnerInfo.companyId == this.companyInfo.companyId) {
            //                 this.selectedAgreement.transporterPartnerInfo.isApprovalDone = approvalStatus.isApproved;
            //             }

            //             if (this.selectedAgreement.processorPartnerInfo.companyId == this.companyInfo.companyId) {
            //                 this.selectedAgreement.processorPartnerInfo.isApprovalDone = approvalStatus.isApproved;
            //             }

            //             this.selectedAgreement.partnerList.forEach(element => {
            //                 if (element.companyId == this.companyInfo.companyId) {
            //                     element.isApprovalDone = approvalStatus.isApproved;
            //                 }
            //             });

            //             // this.switchToAgreementList();

            //             // this.selectedProcess = this.businessAgreementService.prepareProcessDefForView(this.agreementProcessDef[0], this.companyInfo.companyId);

            //             this.tabIndex = 1;
            //             // var savedAgreementInfoForView: AgreementInfo = this.businessAgreementService.prepareAgreementForView(this.selectedAgreement, this.agreementProcessDef, this.companyInfo.companyId, approvalStatus.isApproved);

            //             // this.updateAgreementList(savedAgreementInfoForView);
            //         }

            //     });


            // }
        });
    }

    prepareCompanyCategoryFilterItem() {
        var companyCategories: any[] = Object.assign([], AppConstant.COMPANY_CATEGORY_LIST);
        companyCategories.forEach(element => {
            element.isSelected = false;
            element.title = element[this.companyCategoryTitle];
        });

        return companyCategories;
    }


    filterItems(agreementProcessDef: any[]) {
        var agreementFilterItems: AgreementFilter[] = [];
        var statusFilterItems: AgreementFilter[] = [];
        if (agreementProcessDef) {
            agreementProcessDef.forEach(element => {
                if (element.initialStatus) {
                    element.initialStatus.forEach((status: any) => {

                        var operationIndex = agreementFilterItems.findIndex(item => item.operationId == status.operationDef.operationId);
                        if (operationIndex < 0) {
                            var newOperation: AgreementFilter = {
                                operationId: status.operationDef.operationId,
                                operationTitle: status.operationDef[this.operationTitle],
                                statusList: []
                            };
                            agreementFilterItems.push(newOperation);
                            operationIndex = agreementFilterItems.length - 1;
                        }

                        if (agreementFilterItems[operationIndex].statusList.findIndex(item => item.statusId == status.statusId) < 0) {
                            if (status.statusId == AppConstant.AGREEMENT_STATUS_NEW) {
                                status.isSelected = true;
                            } else if (status.statusId == AppConstant.AGREEMENT_STATUS_IN_USE) {
                                status.isSelected = true;
                            } else {
                                status.isSelected = false;
                            }
                            status.statusTitle = status[this.statusTitle]
                            agreementFilterItems[operationIndex].statusList.push(status);
                        }
                    });
                }
            });
        }

        return agreementFilterItems;
    }

    getOwnApprovalStatus(ownApprovalStatus: OwnApprovalStatus, callBack: any) {
        this.getApprovalStatus(ownApprovalStatus).subscribe(data => {
            if (data) {

            }
            callBack(data);

        });
    }

    getApprovalStatus(agreementStatusUpdate: OwnApprovalStatus): Observable<OwnApprovalStatus> {
        var url = '/agreement/own-approval-status';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, agreementStatusUpdate);
    }

    saveAgreementStatus(agreementStatusUpdate: AgreementStatusUpdate): Observable<AgreementStatusUpdate> {
        var url = '/agreement/update-agreement-status';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, agreementStatusUpdate);
    }

    preparePartnerViewList(partnerList: PartnerInfo[]) {

        if (partnerList) {
            partnerList.forEach(eachPartner => {
                eachPartner.companyZipCodeFormated = this.utilService.prepareZipCodeFormate(eachPartner.companyZipCode);
                eachPartner.contactNoFormated = this.utilService.prepareContactNoFormate(eachPartner.contactNo);
            });
        }

        return partnerList;

    }

    prepareAgreementForView(eachAgreement: AgreementInfo, agreementProcessDef: any[], companyId: string, isApprovalRequired: boolean) {

        if (eachAgreement.dumperPartnerInfo) {
            eachAgreement.dumperPartnerInfo.companyRoleSelection = [false, false, false];
            eachAgreement.dumperPartnerInfo.companyCategorySelection = JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory));
            eachAgreement.dumperPartnerInfo.companyCategorySelection.forEach((eachCategory, index) => {
                if (eachCategory.title == eachAgreement.dumperPartnerInfo.assignedRoles) {
                    eachAgreement.dumperPartnerInfo.companyRoleSelection[index] = true;
                    eachAgreement.dumperPartnerInfo.companyCategorySelection[index].isSelected = true;
                    eachAgreement.dumperPartnerInfo.roleIndex = index;
                }

                if (!JSON.stringify(eachAgreement.dumperPartnerInfo.companyBusinessCategory).includes(eachCategory.title)) {
                    eachAgreement.dumperPartnerInfo.companyCategorySelection[index].isDisable = false;
                }
            });

            eachAgreement.dumperPartnerInfo.companyZipCodeFormated = this.utilService.prepareZipCodeFormate(eachAgreement.dumperPartnerInfo.companyZipCode);
            eachAgreement.dumperPartnerInfo.contactNoFormated = this.utilService.prepareContactNoFormate(eachAgreement.dumperPartnerInfo.contactNo);
        }

        var matchIndexArray: number[] = [];
        if (eachAgreement.partnerList) {
            eachAgreement.partnerList.forEach((eachPartner, i) => {

                if (eachAgreement.dumperPartnerInfo && eachPartner.companyId == eachAgreement.dumperPartnerInfo.companyId) {
                    matchIndexArray.push(i);
                    eachPartner.companyCategorySelection = JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory));
                    eachPartner.companyCategorySelection.forEach((eachCategory, j) => {
                        if (eachCategory.title == eachPartner.assignedRoles) {
                            eachAgreement.dumperPartnerInfo.companyRoleSelection[j] = true;
                            eachAgreement.dumperPartnerInfo.companyCategorySelection[j].isSelected = true;
                            eachAgreement.dumperPartnerInfo.roleIndex = j;
                        }

                        if (!JSON.stringify(eachPartner.companyBusinessCategory).includes(eachCategory.title)) {
                            eachAgreement.dumperPartnerInfo.companyCategorySelection[j].isDisable = false;
                        }
                    });

                } else if (i == 1 && eachAgreement.partnerList[0].companyId == eachPartner.companyId) {
                    matchIndexArray.push(i);
                    eachAgreement.partnerList[0].companyCategorySelection = JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory));
                    eachAgreement.partnerList[0].companyCategorySelection.forEach((eachCategory, j) => {
                        if (eachCategory.title == eachPartner.assignedRoles) {
                            eachAgreement.partnerList[0].companyRoleSelection[j] = true;
                            eachAgreement.partnerList[0].companyCategorySelection[j].isSelected = true;
                            eachAgreement.partnerList[0].roleIndex = j;
                        }

                        if (!JSON.stringify(eachAgreement.partnerList[0].companyBusinessCategory).includes(eachCategory.title)) {
                            eachAgreement.partnerList[0].companyCategorySelection[j].isDisable = false;
                        }
                    });
                } else {
                    eachPartner.companyRoleSelection = [false, false, false];
                    eachPartner.companyCategorySelection = JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory));
                    eachPartner.companyCategorySelection.forEach((eachCategory, k) => {

                        if (eachCategory.title == eachPartner.assignedRoles) {
                            eachPartner.companyRoleSelection[k] = true;
                            eachPartner.companyCategorySelection[k].isSelected = true;
                            eachPartner.roleIndex = k;
                        }

                        if (!JSON.stringify(eachPartner.companyBusinessCategory).includes(eachCategory.title)) {
                            eachPartner.companyCategorySelection[k].isDisable = false;
                        }
                    });
                }

                eachPartner.companyZipCodeFormated = this.utilService.prepareZipCodeFormate(eachPartner.companyZipCode);
                eachPartner.contactNoFormated = this.utilService.prepareContactNoFormate(eachPartner.contactNo);

            });

        }

        if (matchIndexArray && matchIndexArray.length > 0) {
            for (let index = matchIndexArray.length - 1; index >= 0; index--) {
                eachAgreement.partnerList.splice(matchIndexArray[index], 1);
            }
        }

        eachAgreement.processsList = this.prepareAgreementProcessButtons(Object.assign({}, eachAgreement), agreementProcessDef, companyId, isApprovalRequired);

        eachAgreement.agreementStatus.statusTitle = this.getStatusTitle(eachAgreement.agreementStatus.statusId, agreementProcessDef);

        eachAgreement.isApproveRequiredState = (AppConstant.APPROVAL_REQUIRED_STATUS_OF_AGREEMENT.findIndex(item => item == eachAgreement.agreementStatus.statusId) >= 0) ? true : false;



        return eachAgreement;
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

    getStatusTitle(statusId: string, agreementProcessDef: any[]) {
        var statusTitleValue = '';
        if (agreementProcessDef) {

            agreementProcessDef.forEach(eachProcess => {
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

    prepareAgreementProcessButtons(agreement: AgreementInfo, agreementProcessDef: any[], companyId: string, isProcessApprovedByThisCompany: boolean) {

        var processsList: any[] = [];
        if (agreementProcessDef) {

            agreementProcessDef.forEach(eachProcess => {
                if (eachProcess.initialStatus) {
                    eachProcess.initialStatus.forEach((element: any) => {
                        if (element.statusId == agreement.agreementStatus.statusId && !isProcessApprovedByThisCompany) {

                            if (eachProcess.processAction) {
                                eachProcess.processAction.forEach((eachAction: any) => {
                                    eachAction.actionTitle = eachAction[this.actionTitle];
                                });
                            }

                            if (agreement.dumperPartnerInfo.companyId == companyId && eachProcess.creatorAccess != AppConstant.AGREEMENT_PROCESS_ACCESS_NONE) {

                                var creatorProcessDef: any = Object.assign({}, eachProcess);

                                creatorProcessDef.processTitle = creatorProcessDef[this.processTitle];
                                creatorProcessDef.companyId = companyId;

                                if (eachProcess.creatorAccess == AppConstant.AGREEMENT_PROCESS_ACCESS_VIEW) {
                                    creatorProcessDef.viewMode = true;
                                } else {
                                    creatorProcessDef.viewMode = false;
                                }

                                processsList.push(creatorProcessDef);

                            } else if (agreement.transporterPartnerInfo.companyId == companyId && eachProcess.partyAccess != AppConstant.AGREEMENT_PROCESS_ACCESS_NONE) {

                                var firstPartyProcessDef: any = Object.assign({}, eachProcess);

                                firstPartyProcessDef.processTitle = firstPartyProcessDef[this.processTitle];
                                firstPartyProcessDef.companyId = companyId;

                                if (eachProcess.partyAccess == AppConstant.AGREEMENT_PROCESS_ACCESS_VIEW) {
                                    firstPartyProcessDef.viewMode = true;
                                } else {
                                    firstPartyProcessDef.viewMode = false;
                                }

                                processsList.push(firstPartyProcessDef);

                            } else if (agreement.processorPartnerInfo.companyId == companyId && eachProcess.partyAccess != AppConstant.AGREEMENT_PROCESS_ACCESS_NONE) {

                                var secondPartyProcessDef: any = Object.assign({}, eachProcess);

                                secondPartyProcessDef.processTitle = secondPartyProcessDef[this.processTitle];
                                secondPartyProcessDef.companyId = companyId;

                                if (eachProcess.partyAccess == AppConstant.AGREEMENT_PROCESS_ACCESS_VIEW) {
                                    secondPartyProcessDef.viewMode = true;
                                } else {
                                    secondPartyProcessDef.viewMode = false;
                                }

                                processsList.push(secondPartyProcessDef);
                            }

                        }
                    });
                }
            })
        }

        return processsList;
    }

    public agreementFormValidator = (data: AgreementInfo) => {
        var validationReport: ValidationReport = {
            componentCode: 'ValidationSampleComponent',
            data: data,
            controls: [],
            invalidCount: 0,
        };
        var invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_JAPANESE;
        var sampleValue = AppConstant.SAMPLE_VALUE_KEY_JAPANESE;
        var controlName = AppConstant.CONTROL_NAME_JAPANESE;
        var langIndex = this.languageService.getSelectedLanguageIndex();

        if (langIndex == AppConstant.LANG_INDEX_ENG) {
            invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_ENGLISH;
            sampleValue = AppConstant.SAMPLE_VALUE_KEY_ENGLISH;
            controlName = AppConstant.CONTROL_NAME_ENGLISH;
        }

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.AGREEMENT_TAB, AppConstant.UI_MESSAGE_TEXT);

        if (this.agreementFormValidatorRepository.agreementTitleValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.agreementFormValidatorRepository.agreementTitleValidator.controlId,
                controlName: this.agreementFormValidatorRepository.agreementTitleValidator[controlName],
                validations: []
            }
            this.agreementFormValidatorRepository.agreementTitleValidator.validators.forEach((eachValidation: {
                [x: string]: any;
                function: (arg0: string) => any;
            }) => {
                if (!eachValidation.function(data.title)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.agreementFormValidatorRepository.agreementTitleValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });

            validationReport.controls.push(controlValidation);
        }

        if (this.agreementFormValidatorRepository.createDateValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.agreementFormValidatorRepository.createDateValidator.controlId,
                controlName: this.agreementFormValidatorRepository.createDateValidator[controlName],
                validations: []
            }
            this.agreementFormValidatorRepository.createDateValidator.validators.forEach((eachValidation: {
                [x: string]: any;
                function: (arg0: string) => any;
            }) => {
                if (!eachValidation.function(data.createDate)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.agreementFormValidatorRepository.createDateValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });

            validationReport.controls.push(controlValidation);
        }

        if (this.agreementFormValidatorRepository.validDateValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.agreementFormValidatorRepository.validDateValidator.controlId,
                controlName: this.agreementFormValidatorRepository.validDateValidator[controlName],
                validations: []
            }
            this.agreementFormValidatorRepository.validDateValidator.validators.forEach((eachValidation: {
                [x: string]: any;
                function: (arg0: string) => any;
            }) => {
                if (!eachValidation.function(data.validDate)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.agreementFormValidatorRepository.validDateValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });

            validationReport.controls.push(controlValidation);
        }

        if (this.agreementFormValidatorRepository.creatingCompanyPersonInChargeValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.agreementFormValidatorRepository.creatingCompanyPersonInChargeValidator.controlId,
                controlName: this.agreementFormValidatorRepository.creatingCompanyPersonInChargeValidator[controlName],
                validations: []
            }
            this.agreementFormValidatorRepository.creatingCompanyPersonInChargeValidator.validators.forEach((eachValidation: {
                [x: string]: any;
                function: (arg0: string) => any;
            }) => {
                if (!eachValidation.function(data.dumperPartnerInfo.personInChargeName)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.agreementFormValidatorRepository.creatingCompanyPersonInChargeValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });

            validationReport.controls.push(controlValidation);
        }

        if (this.agreementFormValidatorRepository.transporterCompanyValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.agreementFormValidatorRepository.transporterCompanyValidator.controlId,
                controlName: this.agreementFormValidatorRepository.transporterCompanyValidator[controlName],
                validations: []
            }
            this.agreementFormValidatorRepository.transporterCompanyValidator.validators.forEach((eachValidation: {
                [x: string]: any;
                function: (arg0: AgreementPartnerInfo) => any;
            }) => {
                if (!eachValidation.function(data.transporterPartnerInfo)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.agreementFormValidatorRepository.transporterCompanyValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });

            validationReport.controls.push(controlValidation);
        }

        // if (this.agreementFormValidatorRepository.processorCompanyValidator.validators) {

        //     var controlValidation: ControlValidation = {
        //         controlId: this.agreementFormValidatorRepository.processorCompanyValidator.controlId,
        //         controlName: this.agreementFormValidatorRepository.processorCompanyValidator[controlName],
        //         validations: []
        //     }
        //     this.agreementFormValidatorRepository.processorCompanyValidator.validators.forEach((eachValidation: {
        //         [x: string]: any;
        //         function: (arg0: AgreementPartnerInfo) => any;
        //     }) => {
        //         if (!eachValidation.function(data.processorPartnerInfo)) {
        //             var formatValidationMessage: ValidationMessage = {
        //                 message: componentMessage[this.agreementFormValidatorRepository.processorCompanyValidator.controlId],
        //                 sampleValue: eachValidation[sampleValue]
        //             }
        //             controlValidation.validations.push(formatValidationMessage);
        //             validationReport.invalidCount++;
        //         }
        //     });

        //     validationReport.controls.push(controlValidation);
        // }

        return validationReport;
    }

    agreementFormValidatorRepository: any = {
        agreementTitleValidator: {
            controlId: 'agreementTitleValidator',
            controlNameEng: 'Agreement Title',
            controlNameJpn: 'Agreement Title',
            validators: [
                {
                    function: (agreementTitle: String) => {
                        return (agreementTitle && agreementTitle.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty Agreement Title',
                    invalidMsgJpn: 'You cannot empty Agreement Title',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },
        createDateValidator: {
            controlId: 'createDateValidator',
            controlNameEng: 'Create Date',
            controlNameJpn: 'Create Date',
            validators: [
                {
                    function: (createDate: String) => {
                        var langIndex = this.languageService.getSelectedLanguageIndex();
                        if (langIndex == AppConstant.LANG_INDEX_ENG) {
                            return (createDate && createDate.length >= 8) ? true : false;
                        }
                        else if (langIndex == AppConstant.LANG_INDEX_JPN) {
                            return (createDate && createDate.length >= 6) ? true : false;
                        }
                        return false
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty Create Date',
                    invalidMsgJpn: 'You cannot empty Create Date',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },
        validDateValidator: {
            controlId: 'validDateValidator',
            controlNameEng: 'Valid Date',
            controlNameJpn: 'Valid Date',
            validators: [
                {
                    function: (validDate: String) => {
                        var langIndex = this.languageService.getSelectedLanguageIndex();
                        if (langIndex == AppConstant.LANG_INDEX_ENG) {
                            return (validDate && validDate.length >= 8) ? true : false;
                        }
                        else if (langIndex == AppConstant.LANG_INDEX_JPN) {
                            return (validDate && validDate.length >= 6) ? true : false;
                        }
                        return false
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty Valid Date',
                    invalidMsgJpn: 'You cannot empty Valid Date',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },
        creatingCompanyPersonInChargeValidator: {
            controlId: 'creatingCompanyPersonInChargeValidator',
            controlNameEng: 'Creating Company Person in Charge',
            controlNameJpn: 'Creating Company Person in Charge',
            validators: [
                {
                    function: (creatingPersonInCharge: String) => {
                        return (creatingPersonInCharge && creatingPersonInCharge.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty Creating Company Person in Charge',
                    invalidMsgJpn: 'You cannot empty Creating Company Person in Charge',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },
        transporterCompanyValidator: {
            controlId: 'transporterCompanyPersonInChargeValidator',
            controlNameEng: 'Transporter Company Person in Charge',
            controlNameJpn: 'Transporter Company Person in Charge',
            validators: [
                {
                    function: (transporterInfo: AgreementPartnerInfo) => {
                        return (transporterInfo && transporterInfo.personInChargeName && transporterInfo.personInChargeName.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty Transporter Company Person in Charge',
                    invalidMsgJpn: 'You cannot empty Transporter Company Person in Charge',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
                // {
                //     function: (transporterInfo: AgreementPartnerInfo) => {
                //         return (transporterInfo && transporterInfo.accountType && transporterInfo.accountType.length > 0) ? true : false;
                //     },
                //     validMsg: '',
                //     invalidMsgEng: 'You cannot empty Transporter Bank Account',
                //     invalidMsgJpn: 'You cannot empty Transporter Bank Account',
                //     sampleValueEng: '',
                //     sampleValueJpn: ''
                // }
            ]
        },
        processorCompanyValidator: {
            controlId: 'processorCompanyPersonInChargeValidator',
            controlNameEng: 'Processor Company Person in Charge',
            controlNameJpn: 'Processor Company Person in Charge',
            validators: [
                {
                    function: (processorInfo: AgreementPartnerInfo) => {
                        return (processorInfo && processorInfo.personInChargeName && processorInfo.personInChargeName.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty Processor Company Person in Charge',
                    invalidMsgJpn: 'You cannot empty Processor Company Person in Charge',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
                // {
                //     function: (processorInfo: AgreementPartnerInfo) => {
                //         return (processorInfo && processorInfo.accountType && processorInfo.accountType.length > 0) ? true : false;
                //     },
                //     validMsg: '',
                //     invalidMsgEng: 'You cannot empty Processor Company Bank Account',
                //     invalidMsgJpn: 'You cannot empty Processor Company Bank Account',
                //     sampleValueEng: '',
                //     sampleValueJpn: ''
                // },
            ]
        },

    };

    prepareCompanyBusinessCategorySelectionModel(companyBusinessCategory: Array<string>): Array<boolean> {
        var companyRoleSelection: boolean[] = [];
        if (companyBusinessCategory) {
            companyBusinessCategory.forEach(element => {
                companyRoleSelection.push(false);
            });
        }

        return companyRoleSelection;
    }

    getCompanyInfo(companyId: string): Observable<PartnerInfo> {
        var url = '/agreement/get-partnerInfo'
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
    };

    getPartnerList(companyId: string, pageNo: number, searchText: string, status: string): Observable<PartnerInfo[]> {
        var url = '/agreement/get-partners'
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId, pageNo, searchText, status);
    };

    getAgreementInitialInfoList(companyId: string, pageNo: number, searchText: string, status: string): Observable<AgreementInfo[]> {
        var url = '/agreement/agreement-initial-info'
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId, pageNo, searchText, status);
    };

    getAgreementList(companyId: string, pageNo: number, searchText: string, status: string): Observable<AgreementInfo[]> {
        var url = '/agreement/get-agreements'
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId, pageNo, searchText, status);
    };


    getDxrCompanyList(): Observable<CompanyInfoUpdate[]> {
        var url = '/agreement/dxr-companies';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    };

    getDxrCompanyListBySearchAndPaginition(companyId: string, pageNo: number, searchText: string, status: string): Observable<CompanyInfoUpdate[]> {
        var url = '/agreement/get-companies-by-search';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId, pageNo, searchText, status);
    };


    saveAgreementInfo(agreementInfo: AgreementInfo): Observable<AgreementInfo> {
        var url = '/agreement/save-agreement'
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, agreementInfo);
    };

    getPersonInChargeList(companyId: string): Observable<UserInfoFetch[]> {
        var url = '/agreement/company-users'
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
    };

    getWasteList(): Observable<DxrWasteInfoFetch[]> {
        var url = '/company-settings/dxr-waste-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    };

    getCompanyAccountantInfo(companyId: string): Observable<AccountantInfo> {
        var url = '/agreement/company-accountant'
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
    };

    getCompanyBankAccountList(companyId: string): Observable<BankAccountInfo[]> {
        var url = '/agreement/company-bank-accounts';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
    };

    getAgreementProcessDef(): Observable<any[]> {
        var url = '/agreement/get-agreement-process-def';

        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    }


    sendCompanyInvitation(invitation: CompanyInvitation): Observable<string> {
        var url = '/agreement/send-invitation'
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, invitation);
    };


    updateAgreementFilter(statusId: string, filterItems: AgreementFilter[]) {

        var selectedOperationFilter: AgreementFilter = {} as AgreementFilter;

        if (statusId == AppConstant.AGREEMENT_CANCELED_STATUS_ID) {
            filterItems.forEach(element => {
                if (element.operationId == AppConstant.AGREEMENT_CANCELED_OPERATION_ID) {

                    element.statusList.forEach(eachStatus => {
                        if (eachStatus.statusId == AppConstant.AGREEMENT_CANCELED_STATUS_ID) {
                            eachStatus.isSelected = true;
                        }
                    });

                    selectedOperationFilter = element;
                }
            });
        }

        if (statusId == AppConstant.AGREEMENT_REVIVE_READY_FOR_SEND_STATUS_ID) {
            filterItems.forEach(element => {
                if (element.operationId == AppConstant.AGREEMENT_REVIVE_READY_FOR_SEND_OPERATION_ID) {

                    element.statusList.forEach(eachStatus => {
                        if (eachStatus.statusId == AppConstant.AGREEMENT_REVIVE_READY_FOR_SEND_STATUS_ID) {
                            eachStatus.isSelected = true;
                        }
                    });

                    selectedOperationFilter = element;
                }
            });
        }

        return selectedOperationFilter;
    }

    getAgreementInfoForManifestoOp(agreementId: string): Observable<AgreementInfoUpdate> {
        var url = '/agreement/get-agreement-info'
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, agreementId);
    };

    getAgreementBasicInfo(agreementId: string): Observable<AgreementInfo> {
        var url = '/agreement/get-agreement-info'
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, agreementId);
    };

    initPartnerBankAccountInfo(partnerList: AgreementPartnerInfo[]) {
        if (partnerList && partnerList.length > 0) {
            partnerList.forEach(eachPartner => {
                eachPartner.bankAcComponentData = this.prepareBankAccountComponentData(eachPartner);
            })
        }
    }

    prepareBankAccountComponentData(selectedPartner: AgreementPartnerInfo) {
        var popupData: any = {
            companyId: selectedPartner.companyId,
            accountInfo: selectedPartner.accountInfo,
            accountType: selectedPartner.accountType
        }

        if (selectedPartner.accountType == AppConstant.USE_OTHER_BANK_ACCOUNT) {
            popupData.accountInfo = selectedPartner.otherBankAccountInfo;
        }

        return popupData;
    }
}

