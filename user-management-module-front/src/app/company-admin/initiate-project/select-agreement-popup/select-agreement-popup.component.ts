import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { AgreementInfo, AgreementInvoiceWasteInfo, AgreementPartnerInfo, AgreementWasteProcessInfo, AgreementWasteTransportInfo } from 'src/app/models/backend-fetch/business-agreement';
import { ProjectInfoFetch, AgreementInfoFetch, WasteCollectionInfoFetch, WasteCollectionInfoView, DisposalInfoFetch, AgreementInfoView, ProjectWasteItem, wasteProcessInfoFetch, AgreementPopupSaveDetails, AgreementPartnerCompanyFetch, AgreementPopupView } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { BusinessAgreementService } from 'src/app/services/operation-services/dumper-admin/business-agreement.service';
import { InitiateProjectOperationService } from 'src/app/services/operation-services/initiate-project-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AgreementTabComponent } from '../../business-agreement/agreement-tab/agreement-tab.component';

@Component({
    selector: 'app-select-agreement-popup',
    templateUrl: './select-agreement-popup.component.html',
    styleUrls: ['./select-agreement-popup.component.css']
})
export class SelectAgreementPopupComponent implements OnInit {
    agreementList: AgreementInfoFetch[] = [];
    projectInfo!: ProjectInfoFetch;
    wasteCollectionList!: WasteCollectionInfoView[];
    isUserList: boolean = true;
    isWastePick: boolean = false;
    isPickSchedule!: boolean;
    isProcessSchedule!: boolean;
    agreement: AgreementInfoFetch[] = [];
    disposalList!: DisposalInfoFetch[];
    finalDisposalList!: DisposalInfoFetch[];
    projectWasteItemList!: ProjectWasteItem[];
    processList: wasteProcessInfoFetch[] = [];
    wastePickList: WasteCollectionInfoFetch[] = [];
    agreementProcessList: AgreementWasteProcessInfo[] = [];
    componentCode!: string;
    agreementPopupSaveDetails: AgreementPopupSaveDetails = {} as AgreementPopupSaveDetails;
    isSystemAdmin: boolean = false;
    selectedAgreementIds: string[] = [];
    fromManifesto: boolean = false;

    constructor(private businessAgreementService: BusinessAgreementService, public dialogRef: MatDialogRef<SelectAgreementPopupComponent>, @Inject(MAT_DIALOG_DATA) public agreementData: any, private utilService: UtilService, private languageService: LanguageService, private initiateProjectOperationService: InitiateProjectOperationService) { }

    creatorRole: string = "";
    partnerRole: string = "";
    companyId: string = this.utilService.getCompanyIdCookie();
    businessCategoryFilter: any[] = [];

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SELECT_AGREEMENT_POPUP_COMPONENT;
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        this.agreementList = this.agreementData.agreementList;
        this.selectedAgreementIds = this.agreementData.selectedAgreementIds;
        this.creatorRole = this.agreementData.creatorRole
        this.partnerRole = this.agreementData.partnerRole;
        if (this.agreementData.projectInfo) {
            this.projectInfo = this.agreementData.projectInfo;
            this.fromManifesto = false;
            // this.selectedAgreementIds = this.agreementData.projectInfo.agreementInfo.map((item: AgreementInfoFetch) => item.agreementId);
        } else {
            this.projectInfo = this.blankProjectInfo;
            this.fromManifesto = true;
            // this.selectedAgreementIds = this.agreementData.selectedAgreementIds;
        }

        this.isUserList = true;
        this.isWastePick = false;
        this.isPickSchedule = false;
        this.isProcessSchedule = false;
        if (this.agreementList && this.agreementList.length > 0) {
            // this.agreement = this.prepareAgreementViewInfo(this.agreementList[0])
            this.agreement.push(this.agreementList[0]);
        }

        this.businessCategoryFilter = JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory)).filter((item: any) => item.title != this.creatorRole);
    }



    uiLabels: any = {
        wastePickTab: "Waste Pick",
        pickScheduleAndPriceTab: "Pick Schedule and Price",
        agreementListTab: "Agreement List",
        processScheduleAndPrice: "Process Schedule and Price",
        closeBtn: "Close",

    }

    search = (partnerRole: string) => {
        var pageNo: number = JSON.parse(JSON.stringify(this.utilService.getPageNo()));
        var searchText: string = JSON.parse(JSON.stringify(this.utilService.getSearchText()));

        if (!searchText) {
            searchText = '';
        }

        if (!pageNo) {
            pageNo = 0;
        }

        this.initiateProjectOperationService.getAgreementListByCompanyRole(this.companyId, this.creatorRole, partnerRole, searchText, pageNo).subscribe(response => {
            if (response) {
                this.agreementList = response;
                this.prepareAgreementListView();
            }
        })

    }

    prepareAgreementListView() {
        this.agreementList.forEach(item => {
            item.isSelected = (this.projectInfo.agreementInfo && this.projectInfo.agreementInfo.find(agr => agr.agreementId == item.agreementId)) ? true : false;
        })
    }


    prepareAgreementProcessList(selectedAgreements: AgreementInfoFetch[]) {
        var agreementProcessList: AgreementWasteProcessInfo[] = [];
        if (selectedAgreements) {
            selectedAgreements.forEach(eachAgreement => {
                if (eachAgreement.processList) {
                    eachAgreement.processList.forEach(eachWaste => {
                        eachWaste.agreementId = eachAgreement.agreementId;
                    });

                    agreementProcessList.push(...eachAgreement.processList);
                }

            })
        }
        return agreementProcessList;
    }

    prepareAgreementInvoiceWasteList(selectedAgreements: AgreementInfoFetch[]) {
        var agreementInvoiceWasteInfo: AgreementInvoiceWasteInfo[] = [];
        if (selectedAgreements) {
            selectedAgreements.forEach(eachAgreement => {
                if (eachAgreement.agreementInvoiceWasteList && eachAgreement.agreementInvoiceWasteList.length > 0) {

                    agreementInvoiceWasteInfo.push(...eachAgreement.agreementInvoiceWasteList);
                }

            })
        }
        return agreementInvoiceWasteInfo;
    }

    selectedAgreementInvoiceWasteList: AgreementInvoiceWasteInfo[] = [];

    prepareWasteCollectionListForView(selectedAgreementList: AgreementInfoFetch[]): WasteCollectionInfoView[] {
        var intersectedWasteCollectionInfoViewList: WasteCollectionInfoView[] = [];

        if (selectedAgreementList) {
            var wasteCollectionInfoViewList: WasteCollectionInfoView[] = [];
            selectedAgreementList.forEach(agreement => {

                if (!this.projectInfo.initialAgreementId || (this.projectInfo.initialAgreementId && this.projectInfo.initialAgreementId == agreement.agreementId)) {
                    agreement.wastePickList.forEach(waste => {
                        var wasteCollectionInfo: WasteCollectionInfoView = {
                            wasteCollectionId: waste.wasteCollectionId,
                            agreementId: waste.agreementId,
                            wasteTypeId: waste.wasteTypeId,
                            wasteTypeName: waste.wasteTypeName,
                            wasteItemId: waste.wasteItemId,
                            wasteItemName: waste.wasteItemName,
                            pickZipCode: waste.pickZipCode,
                            pickAddress: waste.pickAddress,
                            dropZipCode: waste.dropZipCode,
                            dropAddress: waste.dropAddress,
                            price: 0,
                            unit: waste.unit,
                            isCheck: false,
                            wasteShape: waste.wasteShape,
                            wastePackage: waste.wastePackage
                        }

                        wasteCollectionInfo.price = this.getTransportPrice(wasteCollectionInfo);
                        wasteCollectionInfo.isCheck = this.isExistInProjectDisposal(waste.wasteCollectionId);

                        if (!this.projectInfo.initialAgreementId || (this.projectInfo.initialAgreementId && wasteCollectionInfo.isCheck)) {
                            wasteCollectionInfoViewList.push(wasteCollectionInfo);
                        }
                    });
                }
            })

            intersectedWasteCollectionInfoViewList = (selectedAgreementList && selectedAgreementList.length == 2 && !this.projectInfo.initialAgreementId) ? this.getCommonPicks(wasteCollectionInfoViewList) : wasteCollectionInfoViewList;
        }

        return intersectedWasteCollectionInfoViewList;
    }

    getCommonPicks(wasteCollectionInfoViewList: WasteCollectionInfoView[]) {
        var intersectedWasteCollectionInfoView: WasteCollectionInfoView[] = [];

        var collectionCopy: WasteCollectionInfoView[] = JSON.parse(JSON.stringify(wasteCollectionInfoViewList))
        wasteCollectionInfoViewList.forEach((eachCollection, index) => {
            for (let j = index + 1; j < collectionCopy.length; j++) {
                const commonCollection = collectionCopy[j];

                if (eachCollection.wasteItemId == commonCollection.wasteItemId && eachCollection.pickZipCode == commonCollection.pickZipCode && eachCollection.dropZipCode == commonCollection.dropZipCode) {
                    var newItem: WasteCollectionInfoView = JSON.parse(JSON.stringify(commonCollection));
                    commonCollection.isCheck = (eachCollection.isCheck || commonCollection.isCheck) ? true : false;
                    intersectedWasteCollectionInfoView.push(newItem);
                }
            }
        })

        return intersectedWasteCollectionInfoView;
    }

    getTransportPrice(commonCollection: WasteCollectionInfoView) {
        var transportPrice: number = 0.0;

        this.selectedAgreementInvoiceWasteList.forEach(eachInvoiceInfo => {
            if (eachInvoiceInfo.wasteDefId == commonCollection.wasteItemId && eachInvoiceInfo.pickZipCode == commonCollection.pickZipCode && eachInvoiceInfo.dropZipCode == commonCollection.dropZipCode) {
                if (eachInvoiceInfo.operationType == AppConstant.TRANSPORTER_INVOICE) {
                    transportPrice = eachInvoiceInfo.price;
                }

                // if (eachInvoiceInfo.operationType == AppConstant.PROCESSOR_INVOICE) {
                //     commonCollection.price = eachInvoiceInfo.price;
                // }
            }

        });

        return transportPrice;

    }

    isExistInProjectDisposal(collectionId: string) {
        var found: number = -1;
        if (this.projectInfo.wasteDisposalInfo) {
            found = this.projectInfo.wasteDisposalInfo.findIndex(item => item.collectionId == collectionId);
        }


        return (found >= 0) ? true : false;
    }

    prepareDisposalViewId(disposalList: DisposalInfoFetch[]): DisposalInfoFetch[] {
        disposalList.forEach(disposal => {
            var id: number = 0;
            if (disposal.isParent) {
                id++;
                disposal.disposalViewId = "" + id;
                disposalList.forEach(child => {
                    if (disposal.collectionId == child.collectionId && !child.isParent) {
                        id++;
                        child.disposalViewId = "" + id;
                    }

                });
            }

        });
        return disposalList;
    }

    public prepareDisposalList = (collectionList: WasteCollectionInfoView[]): DisposalInfoFetch[] => {

        var disposalInfoList: DisposalInfoFetch[] = [];
        if (collectionList) {
            collectionList.forEach(wasteCollection => {
                var disposal: DisposalInfoFetch = {
                    transportDistance: 0,
                    projectId: "",
                    projectTitle: "",
                    disposalInfoId: "",
                    disposalViewId: "",
                    collectionId: "",
                    fromDate: "",
                    startBackendDate: "",
                    toDate: "",
                    endBackendDate: "",
                    fromDateView: "",
                    toDateView: "",
                    quantity: 0,
                    planQuantity: 0,
                    remainingQuantity: 0,
                    wasteTypeId: "",
                    wasteTypeName: "",
                    wasteItemId: "",
                    wasteItemName: "",
                    pickLocation: "",
                    pickZipCode: "",
                    dropLocation: "",
                    dropZipCode: "",
                    isParent: false,
                    unit: "",
                    price: 0,
                    disposeWisePickList: [],
                    scheduleConfirmStatus: "0",
                    wasteShape: '',
                    wastePackage: ''
                }
                if (wasteCollection) {
                    var flag: boolean = false;
                    if (this.projectInfo.wasteDisposalInfo) {
                        this.projectInfo.wasteDisposalInfo.forEach(oldDisposal => {
                            if (wasteCollection.wasteCollectionId == oldDisposal.collectionId) {
                                flag = true;
                                oldDisposal.price = wasteCollection.price;
                                disposalInfoList.push(oldDisposal);

                            }

                        });
                    }

                    if (!flag) {
                        disposal.disposalInfoId = this.utilService.generateUniqueId();
                        disposal.collectionId = wasteCollection.wasteCollectionId;
                        disposal.wasteTypeId = wasteCollection.wasteTypeId;
                        disposal.wasteTypeName = wasteCollection.wasteTypeName;
                        disposal.wasteItemId = wasteCollection.wasteItemId;
                        disposal.wasteItemName = wasteCollection.wasteItemName;
                        disposal.pickLocation = wasteCollection.pickAddress;
                        disposal.pickZipCode = wasteCollection.pickZipCode;
                        disposal.dropLocation = wasteCollection.dropAddress;
                        disposal.dropZipCode = wasteCollection.dropZipCode;
                        disposal.isParent = true;
                        disposal.unit = wasteCollection.unit;
                        disposal.wasteShape = wasteCollection.wasteShape;
                        disposal.wastePackage = wasteCollection.wastePackage;
                        disposal.price = wasteCollection.price;
                        disposalInfoList.push(disposal);
                    }
                }

            });
        }

        disposalInfoList = this.prepareDisposalViewId(disposalInfoList);
        return disposalInfoList;
    }

    prepareAgreementViewInfo(agreementInfo: AgreementInfoFetch): AgreementInfoView {
        var agreementViewInfo: AgreementInfoView = {
            companyId: "",
            agreementId: "",
            agreementTitle: "",
            agreementValidDate: "",
        }
        agreementViewInfo.companyId = agreementInfo.companyId;
        agreementViewInfo.agreementId = agreementInfo.agreementId;
        agreementViewInfo.agreementTitle = agreementInfo.agreementTitle;
        agreementViewInfo.agreementValidDate = agreementInfo.agreementValidDate;
        return agreementViewInfo
    }

    updateProcessListForAddNewPick(processList: wasteProcessInfoFetch[], disposalList: DisposalInfoFetch[]): wasteProcessInfoFetch[] {
        processList.forEach(process => {
            process.quantity = 0;
            disposalList.forEach(disposal => {
                if (process.wasteItemId == disposal.wasteItemId) {
                    process.quantity += disposal.quantity;

                }
            });

            process.totalPrice = process.quantity * process.price;

        });

        return processList;
    }

    selectedIndex = 0;

    public switchTabToWastePick = (index: number, agreementInfo: AgreementInfoFetch[]): void => {

        if (agreementInfo) {
            this.selectedIndex = index;
            // this.agreement = this.prepareAgreementViewInfo(agreementInfo);
            this.agreement = agreementInfo;

            this.initDataPreparationForNewAgreement(agreementInfo, () => {
                this.isUserList = false;
                this.isWastePick = true;
            })
        }
    }

    newAgreementForSave: AgreementInfo | undefined;

    initDataPreparationForNewAgreement(agreementInfo: AgreementInfoFetch[], callBack: any) {

        this.newAgreementForSave = {} as AgreementInfo;
        this.agreementProcessList = this.prepareAgreementProcessList(agreementInfo);

        if (this.projectInfo.initialAgreementId && this.projectInfo.agreementInfo.length == 2) {

            this.wasteCollectionList = this.prepareWasteCollectionListForView(agreementInfo);

            var newAgreement: AgreementInfoFetch = this.projectInfo.agreementInfo[1];
            var agreementTransportWasteInfoItems: AgreementWasteTransportInfo[] = this.prepareNewAgreementTransportInfo(newAgreement, this.wasteCollectionList);
            this.businessAgreementService.getAgreementBasicInfo(newAgreement.agreementId).subscribe(savedAgreementInfo => {

                savedAgreementInfo.agreementWasteTransportInfo.push(...agreementTransportWasteInfoItems);
                savedAgreementInfo.agreementWasteProcessInfo = this.businessAgreementService.prepareWateProcessingInfoList(savedAgreementInfo.agreementWasteTransportInfo, savedAgreementInfo.agreementWasteProcessInfo);
                savedAgreementInfo.agreementInvoiceWasteList = this.businessAgreementService.prepareInvoiceWasteInfoList(savedAgreementInfo);

                this.newAgreementForSave = savedAgreementInfo;

                newAgreement.agreementInvoiceWasteList = savedAgreementInfo.agreementInvoiceWasteList;
                newAgreement.wastePickList = this.prepareAgreementPickWasteFromAgreementTransportWaste(savedAgreementInfo);
                newAgreement.processList = savedAgreementInfo.agreementWasteProcessInfo;

                this.selectedAgreementInvoiceWasteList = this.prepareAgreementInvoiceWasteList(agreementInfo);
                this.wasteCollectionList = this.prepareWasteCollectionListForView(agreementInfo);

                this.disposalList = this.prepareDisposalList(this.wasteCollectionList);

                callBack();
            });

            // this.initDataPreparationForNewAgreement();
        } else {
            this.selectedAgreementInvoiceWasteList = this.prepareAgreementInvoiceWasteList(agreementInfo);
            this.wasteCollectionList = this.prepareWasteCollectionListForView(agreementInfo);
            this.disposalList = this.prepareDisposalList(this.wasteCollectionList);

            callBack();
        }
    }

    prepareAgreementPickWasteFromAgreementTransportWaste(agreement: AgreementInfo) {
        var wasteCollectionInfoFetchItems: WasteCollectionInfoFetch[] = [];

        if (agreement.agreementWasteTransportInfo) {
            agreement.agreementWasteTransportInfo.forEach(eachTransportWaste => {
                var wasteCollectionInfoFetch: WasteCollectionInfoFetch = {
                    wasteCollectionId: eachTransportWaste.agreementWasteTransportInfoId,
                    agreementId: agreement.agreementId,
                    wasteTypeId: eachTransportWaste.wasteCategoryId,
                    wasteTypeName: eachTransportWaste.wasteCategoryTitle,
                    wasteItemId: eachTransportWaste.wasteDefId,
                    wasteItemName: eachTransportWaste.wasteTitle,
                    pickZipCode: eachTransportWaste.pickZipCode,
                    pickAddress: eachTransportWaste.pickAddress,
                    dropZipCode: eachTransportWaste.dropZipCode,
                    dropAddress: eachTransportWaste.dropAddress,
                    price: eachTransportWaste.price,
                    unit: eachTransportWaste.unit,
                    wasteShape: "",
                    wastePackage: ''
                }

                wasteCollectionInfoFetchItems.push(wasteCollectionInfoFetch);
            })
        }

        return wasteCollectionInfoFetchItems;
    }

    prepareNewAgreementTransportInfo(newAgreement: AgreementInfoFetch, preparedCollectionList: WasteCollectionInfoView[]) {
        var agreementTransportWasteInfoItems: AgreementWasteTransportInfo[] = [];
        var agreementWasteTransportInfoItems: WasteCollectionInfoFetch[] = newAgreement.wastePickList;

        if (preparedCollectionList) {
            preparedCollectionList.forEach(eachSelectedCollection => {
                var findInAgreementTransportInfo = agreementWasteTransportInfoItems.findIndex(item => item.wasteItemId == eachSelectedCollection.wasteItemId && item.pickZipCode == eachSelectedCollection.pickZipCode && item.dropZipCode == item.dropZipCode);

                if (findInAgreementTransportInfo < 0) {
                    var agreementTransportWasteInfo: AgreementWasteTransportInfo = this.prepareAgreementWasteTrasnportInfoFromWasteCollectionInfo(eachSelectedCollection);
                    agreementTransportWasteInfoItems.push(agreementTransportWasteInfo);
                }


            })
        }



        return agreementTransportWasteInfoItems;

    }

    prepareAgreementWasteTrasnportInfoFromWasteCollectionInfo(wasteCollectionInfo: WasteCollectionInfoView) {
        var agreementTransportWasteInfo: AgreementWasteTransportInfo = {
            agreementWasteTransportInfoId: this.utilService.generateUniqueId(),
            wasteDefId: wasteCollectionInfo.wasteItemId,
            wasteCategoryId: wasteCollectionInfo.wasteTypeId,
            wasteTitle: wasteCollectionInfo.wasteItemName,
            wasteCategoryTitle: wasteCollectionInfo.wasteTypeName,
            pickZipCode: wasteCollectionInfo.pickZipCode,
            pickAddress: wasteCollectionInfo.pickAddress,
            pickBrachId: "",
            dropZipCode: wasteCollectionInfo.dropZipCode,
            dropAddress: wasteCollectionInfo.dropAddress,
            dropBrachId: "",
            price: wasteCollectionInfo.price,
            unit: wasteCollectionInfo.unit,
        }

        return agreementTransportWasteInfo;
    }

    prepareMissingInvoiceWasteInfo(existingInvoiceWasteInfos: AgreementInvoiceWasteInfo[], preparedCollectionList: WasteCollectionInfoView[], newAgreementId: string, newAgreementInvoiceGeneratorId: string, newAgreementInvoiceGenerator: AgreementPartnerCompanyFetch, newAgreementInvoiceReceiverId: string, newAgreementInvoiceReceiver: AgreementPartnerCompanyFetch) {
        var newInvoiceWasteInfos: AgreementInvoiceWasteInfo[] = [];

        if (preparedCollectionList) {
            preparedCollectionList.forEach(eachCollection => {
                eachCollection.transporterInvoiceInfo = false;
                eachCollection.transporterInvoicePrice = 0;
                eachCollection.processorInvoiceInfo = false;
                eachCollection.processorInvoicePrice = 0;
                if (existingInvoiceWasteInfos) {
                    existingInvoiceWasteInfos.forEach(eachInvoiceWaste => {
                        if (eachInvoiceWaste.wasteDefId == eachCollection.wasteItemId && eachInvoiceWaste.pickZipCode == eachCollection.pickZipCode && eachInvoiceWaste.dropZipCode == eachCollection.dropZipCode) {
                            if (eachInvoiceWaste.operationType == AppConstant.TRANSPORTER_INVOICE) {
                                eachCollection.transporterInvoiceInfo = true;
                                eachCollection.transporterInvoicePrice = eachInvoiceWaste.price;
                            }

                            if (eachInvoiceWaste.operationType == AppConstant.PROCESSOR_INVOICE) {
                                eachCollection.processorInvoiceInfo = true;
                                eachCollection.processorInvoicePrice = eachInvoiceWaste.price;
                            }
                        }
                    })
                }

                if (!eachCollection.transporterInvoiceInfo) {
                    var newTransportInvoiceWasteInfo: AgreementInvoiceWasteInfo = this.prepareInvoiceWasteInfo(eachCollection, AppConstant.TRANSPORTER_INVOICE, newAgreementId, newAgreementInvoiceGeneratorId, newAgreementInvoiceGenerator.companyName, newAgreementInvoiceReceiverId, newAgreementInvoiceReceiver.companyName);

                    newInvoiceWasteInfos.push(newTransportInvoiceWasteInfo);
                }

                if (!eachCollection.processorInvoiceInfo) {
                    var newProcessorInvoiceWasteInfo: AgreementInvoiceWasteInfo = this.prepareInvoiceWasteInfo(eachCollection, AppConstant.PROCESSOR_INVOICE, newAgreementId, newAgreementInvoiceGeneratorId, newAgreementInvoiceGenerator.companyName, newAgreementInvoiceReceiverId, newAgreementInvoiceReceiver.companyName);

                    newInvoiceWasteInfos.push(newProcessorInvoiceWasteInfo);
                }

            });
        }

        return newInvoiceWasteInfos;
    }

    prepareInvoiceWasteInfo(eachCollection: WasteCollectionInfoView, invoiceType: string, newAgreementId: string, newAgreementInvoiceGeneratorId: string, newAgreementInvoiceGenerator: string, newAgreementInvoiceReceiverId: string, newAgreementInvoiceReceiver: string) {
        var newInvoiceWasteInfo: AgreementInvoiceWasteInfo = {
            agreementInvoiceWasteInfoId: '',
            wasteDefId: eachCollection.wasteItemId,
            wasteCategoryId: eachCollection.wasteTypeId,
            wasteTitle: eachCollection.wasteItemName,
            wasteCategoryTitle: eachCollection.wasteTypeName,
            pickZipCode: eachCollection.pickZipCode,
            pickAddress: eachCollection.pickAddress,
            dropZipCode: eachCollection.dropZipCode,
            dropAddress: eachCollection.dropAddress,
            price: 0,
            unit: eachCollection.unit,
            agreementId: newAgreementId,
            priceSuffix: '',
            operationType: invoiceType,
            invoiceGenerator: newAgreementInvoiceGeneratorId,
            invoiceGeneratorName: newAgreementInvoiceGenerator,
            invoiceReceiver: newAgreementInvoiceReceiverId,
            invoiceReceiverName: newAgreementInvoiceReceiver,
            isNew: true
        }

        return newInvoiceWasteInfo;
    }

    getAgreementCompany(agreement: AgreementInfoFetch, companyId: string) {
        return (agreement.dumperPartner && agreement.dumperPartner.companyInfoId == companyId) ? agreement.dumperPartner : ((agreement.transporterPartner && agreement.transporterPartner.companyInfoId == companyId) ? agreement.transporterPartner : (agreement.processorPartner && agreement.processorPartner.companyInfoId == companyId) ? agreement.processorPartner : {} as AgreementPartnerCompanyFetch);
    }

    getBilateralAgreementInvoiceGenerator(agreement: AgreementInfoFetch) {
        return (agreement.dumperPartner && agreement.dumperPartner.companyInfoId != agreement.invoiceReceiverComId) ? agreement.dumperPartner.companyInfoId : (agreement.transporterPartner && agreement.transporterPartner.companyInfoId != agreement.invoiceReceiverComId) ? agreement.transporterPartner.companyInfoId : "";
    }

    public switchTabToPickSchedul = (index: number, colleection: WasteCollectionInfoView[], disposalList: DisposalInfoFetch[], flag: boolean): void => {

        if (!flag) {
            this.selectedIndex = index;
            this.finalDisposalList = this.prepareFinalDisposalList(colleection);
            this.projectWasteItemList = this.prepareProjectWasteItemList(colleection);
            this.wastePickList = this.prepareWastePickList(colleection);
            this.processList = this.prepareProcessList(this.finalDisposalList);
            this.isUserList = true;
            this.isWastePick = true;
            this.isPickSchedule = false;
            this.isProcessSchedule = true;

            this.saveAgreementInfoForInitiateProject(index, flag);
        }
        else {
            this.selectedIndex = index;
            this.isUserList = true;
            this.isWastePick = false;
            this.isPickSchedule = true;
            this.isProcessSchedule = true;
        }
    }

    public prepareFinalDisposalList = (collectionList: WasteCollectionInfoView[]): DisposalInfoFetch[] => {
        var disposalInfoList: DisposalInfoFetch[] = [];
        if (collectionList) {
            collectionList.forEach(wasteCollection => {

                if (wasteCollection.isCheck) {
                    var flag: boolean = false;
                    if (this.disposalList) {
                        this.disposalList.forEach(oldDisposal => {
                            if (wasteCollection.wasteCollectionId == oldDisposal.collectionId) {
                                flag = true;
                                oldDisposal.price = wasteCollection.price;
                                disposalInfoList.push(oldDisposal);

                            }

                        });
                    }
                }
            });
        }

        return disposalInfoList;
    }

    prepareProjectWasteItemList(collectionList: WasteCollectionInfoView[]): ProjectWasteItem[] {
        var projectWasteItemList: ProjectWasteItem[] = [];
        collectionList.forEach(collection => {
            if (collection.isCheck) {
                var isExist: boolean = false;
                projectWasteItemList.forEach(wasteItem => {
                    if (wasteItem.wasteItemId == collection.wasteItemId) {
                        isExist = true;
                    }
                });
                if (!isExist) {
                    var projectWasteItem: ProjectWasteItem = {
                        wasteCollectionId: "",
                        agreementId: "",
                        wasteTypeId: "",
                        wasteTypeName: "",
                        wasteItemId: "",
                        wasteItemName: "",
                        unit: '',
                        price: 0
                    }

                    projectWasteItem.wasteCollectionId = collection.wasteCollectionId;
                    projectWasteItem.agreementId = collection.agreementId;
                    projectWasteItem.wasteTypeId = collection.wasteTypeId;
                    projectWasteItem.wasteTypeName = collection.wasteTypeName;
                    projectWasteItem.wasteItemId = collection.wasteItemId;
                    projectWasteItem.wasteItemName = collection.wasteItemName;
                    projectWasteItem.unit = collection.unit;
                    projectWasteItem.price = collection.price;

                    // this.agreementProcessList.forEach(element => {
                    //     if (element.wasteDefId == projectWasteItem.wasteItemId && element.agreementId && collection.agreementId == element.agreementId) {
                    //         projectWasteItem.price = element.price;
                    //     }
                    // });

                    projectWasteItemList.push(projectWasteItem);
                }
            }
        });
        return projectWasteItemList;
    }

    prepareWastePickList(collectionList: WasteCollectionInfoView[]): WasteCollectionInfoFetch[] {
        var wastePickList: WasteCollectionInfoFetch[] = [];
        collectionList.forEach(collection => {
            if (collection.isCheck) {
                var wastePickInfo: WasteCollectionInfoFetch = {
                    wasteCollectionId: "",
                    agreementId: "",
                    wasteTypeId: "",
                    wasteTypeName: "",
                    wasteItemId: "",
                    wasteItemName: "",
                    pickZipCode: "",
                    pickAddress: "",
                    dropZipCode: "",
                    dropAddress: "",
                    price: 0,
                    unit: "",
                    wasteShape: '',
                    wastePackage: ''
                }
                wastePickInfo.wasteCollectionId = collection.wasteCollectionId;
                wastePickInfo.agreementId = collection.agreementId;
                wastePickInfo.wasteTypeId = collection.wasteTypeId;
                wastePickInfo.wasteTypeName = collection.wasteTypeName;
                wastePickInfo.wasteItemId = collection.wasteItemId;
                wastePickInfo.wasteItemName = collection.wasteItemName;
                wastePickInfo.pickZipCode = collection.pickZipCode;
                wastePickInfo.pickAddress = collection.pickAddress;
                wastePickInfo.dropZipCode = collection.dropZipCode;
                wastePickInfo.dropAddress = collection.dropAddress;
                wastePickInfo.price = collection.price;
                wastePickInfo.unit = collection.unit;
                wastePickInfo.wasteShape = collection.wasteShape;
                wastePickInfo.wastePackage = collection.wastePackage;
            }
        });
        return wastePickList;
    }

    prepareProcessList = (disposalList: DisposalInfoFetch[]): wasteProcessInfoFetch[] => {

        var processList: wasteProcessInfoFetch[] = [];
        this.projectWasteItemList.forEach(item => {
            var processInfo: wasteProcessInfoFetch = {
                wasteProcessId: "",
                agreementId: "",
                wasteTypeId: "",
                wasteTypeName: "",
                startBackendDate: "",
                endBackendDate: "",
                wasteItemId: "",
                wasteItemName: "",
                processStartDate: "",
                processEndDate: "",
                quantity: 0,
                price: 0,
                unit: '',
                totalPrice: 0

            }
            // var flag: boolean = false;
            // this.projectInfo.wasteProcessInfo.forEach(oldProcess => {
            //     if (oldProcess.wasteItemId == item.wasteItemId) {
            //         flag = true;
            //         processList.push(oldProcess);
            //     }

            // });
            // if (!flag) {
            processInfo.wasteProcessId = this.utilService.generateUniqueId();
            processInfo.agreementId = item.agreementId;
            processInfo.wasteTypeId = item.wasteTypeId;
            processInfo.wasteTypeName = item.wasteTypeName;
            processInfo.wasteItemId = item.wasteItemId;
            processInfo.wasteItemName = item.wasteItemName;
            processInfo.unit = item.unit;

            // this.agreementProcessList.forEach(element => {
            //     if (element.wasteDefId == processInfo.wasteItemId) {
            //         processInfo.price = element.price;
            //     }
            // });

            this.selectedAgreementInvoiceWasteList.forEach(element => {
                if (element.wasteDefId == processInfo.wasteItemId && element.operationType == AppConstant.PROCESSOR_INVOICE) {
                    processInfo.price = element.price;
                }
            });

            // processList.forEach(process => {
            var value: number = 0;

            disposalList.forEach(disposal => {

                if (processInfo.wasteItemId == disposal.wasteItemId) {
                    value += disposal.quantity;
                    // process.quantity = process.quantity + disposal.quantity;
                }
            });
            processInfo.quantity = value;
            processInfo.totalPrice = processInfo.quantity * processInfo.price;

            // });

            processList.push(processInfo);
            // }
        });
        if (this.projectInfo.wasteDisposalInfo.length > 0 && this.projectInfo.wasteDisposalInfo) {
            processList = this.updateProcessListForAddNewPick(processList, disposalList);
        }


        return processList;
    }

    saveAgreementInfoForInitiateProject(index: number, flag: boolean) {

        this.prepareAgreementPopupSaveDetails();

        this.popupCloseOrTabChange(index, this.agreementPopupSaveDetails, flag);
    }

    prepareAgreementPopupSaveDetails() {

        this.agreementPopupSaveDetails.selectAgreement = this.agreement;
        this.agreementPopupSaveDetails.selectDiposalList = this.finalDisposalList;
        this.agreementPopupSaveDetails.selectProceessList = this.processList;
        this.agreementPopupSaveDetails.selectedWasteItemList = this.projectWasteItemList;
        this.agreementPopupSaveDetails.newAgreementForSave = this.prepareNewAgreementForSave(this.newAgreementForSave);

        return this.agreementPopupSaveDetails;
    }

    prepareNewAgreementForSave(newAgreement?: AgreementInfo) {

        if (newAgreement && newAgreement.agreementId) {
            if (newAgreement.agreementInvoiceWasteList) {
                newAgreement.agreementInvoiceWasteList.forEach(eachInvoiceWaste => {
                    this.updateTransportAndProcessPriceAccordingToInvoice(newAgreement, eachInvoiceWaste);
                })
            }

            newAgreement.agreementInvoiceWasteList = this.businessAgreementService.prepareInvoiceWasteInfoList(newAgreement);
        }

        return newAgreement;
    }

    updateTransportAndProcessPriceAccordingToInvoice(agreement: AgreementInfo, invoiceWaste: AgreementInvoiceWasteInfo) {
        var transportWaste: number = agreement.agreementWasteTransportInfo.findIndex(item => item.wasteDefId == invoiceWaste.wasteDefId && item.pickZipCode == invoiceWaste.pickZipCode && item.dropZipCode == invoiceWaste.dropZipCode);

        var processWaste: number = agreement.agreementWasteProcessInfo.findIndex(item => item.wasteDefId == invoiceWaste.wasteDefId);

        if (agreement.isTransportPriceApply && agreement.isProcessingPriceApply && transportWaste && processWaste) {
            var sumOfTransportAndProcessPrice: number = agreement.agreementWasteTransportInfo[transportWaste].price + agreement.agreementWasteProcessInfo[processWaste].price;
            if (sumOfTransportAndProcessPrice != invoiceWaste.price) {
                agreement.agreementWasteTransportInfo[transportWaste].price = invoiceWaste.price / 2;
                agreement.agreementWasteProcessInfo[processWaste].price = invoiceWaste.price / 2;
            }

        } else if (agreement.isTransportPriceApply && transportWaste && agreement.agreementWasteTransportInfo[transportWaste].price != invoiceWaste.price) {

            agreement.agreementWasteTransportInfo[transportWaste].price = invoiceWaste.price;

        } else if (agreement.isProcessingPriceApply && processWaste && agreement.agreementWasteProcessInfo[processWaste].price != invoiceWaste.price) {

            agreement.agreementWasteProcessInfo[processWaste].price = invoiceWaste.price;

        }
    }

    public switchTabToProcessSchedul = (index: number, disposalList: DisposalInfoFetch[], flag: boolean): void => {
        if (!flag) {
            this.selectedIndex = index;
            this.processList = this.prepareProcessList(disposalList);
            this.isUserList = true;
            this.isWastePick = true;
            this.isPickSchedule = true;
            this.isProcessSchedule = false;
        }
        else {
            this.selectedIndex = index;
            this.isUserList = true;
            this.isWastePick = false;
            this.isPickSchedule = true;
            this.isProcessSchedule = true;
        }
    }

    public popupCloseOrTabChange = (index: number, saveData: AgreementPopupSaveDetails, flag: boolean): void => {

        if (!flag) {
            saveData.selectProceessList = this.processList;
            this.dialogRef.close(saveData);
        }
        else {
            this.selectedIndex = index;
            this.isUserList = true;
            this.isWastePick = true;
            this.isPickSchedule = false;
            this.isProcessSchedule = true;
        }
    }

    saveAgreementForMenifesto = () => {
        this.agreementPopupSaveDetails.selectAgreement = this.agreement;
        this.agreementPopupSaveDetails.selectDiposalList = this.prepareFinalDisposalList(this.wasteCollectionList);
        this.agreementPopupSaveDetails.selectedWasteItemList = this.prepareProjectWasteItemList(this.wasteCollectionList);

        if (this.agreementPopupSaveDetails.selectDiposalList && this.agreementPopupSaveDetails.selectedWasteItemList) {

            this.dialogRef.close(this.agreementPopupSaveDetails);
        }

    }

    blankProjectInfo: ProjectInfoFetch = {
        companyCategorySelection: [],
        projectScheduleStatus: "",
        initiatorCompanyName: "",
        operatingOfficeName: "",
        operatingOfficeId: "",
        operatingAddress: "",
        operatingZipCode: "",
        processsList: [],
        isApproveRequiredState: false,
        companyId: "",
        projectInfoId: "",
        projectTitle: "",
        projectCreationDate: "",
        projectStartDate: "",
        projectEndDate: "",
        projectCreationDateView: "",
        projectStartDateView: "",
        projectEndDateView: "",
        operatingBranch:
        {
            companyId: "",
            branchId: "",
            branchName: "",
            zipcode: "",
            branchAddress: "",
            branchContactNo: "",
            branchInchargeName: "",
            branchBusinessCategory: [],
            remark: "",
        },
        status: {
            statusId: "",
            statusCode: "",
            statusName: "",
            statusDescription: "",
        },
        dumperPartner: {
            companyInfoId: "",
            companyName: "",
            personIncharge: "",
            personInchargeEmail: "",
            assignRoles: ""
        },
        processorPartner: {
            companyInfoId: "",
            companyName: "",
            personIncharge: "",
            personInchargeEmail: "",
            assignRoles: ""
        },
        transporterPartner: {
            companyInfoId: "",
            companyName: "",
            personIncharge: "",
            personInchargeEmail: "",
            assignRoles: ""
        },
        wasteItemList: [],
        agreementInfo: [],
        wastePickInfo: [],
        wasteProcessInfo: [],
        wasteDisposalInfo: [],
        isTransporter: false,
        isBasicInfoFetched: false,
        isOpen: false,
        manifestoList: [],
        remarks: ''
    }

}
