import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { AppConstant } from 'src/app/config/app-constant';
import { AgreementInfoUpdate, AgreementPartnerInfo, CompanyCategorySelection } from 'src/app/models/backend-fetch/business-agreement';
import { ProjectInfoFetch, AgreementPopupView, AgreementInfoFetch, AgreementPopupSaveDetails, DisposalInfoFetch, wasteItemInfo } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { DumperInfo, ManifestoDisposeWasteInfo, ManifestoProcessWasteInfo, MenifestoInfo, ProcessorInfo, TransportInfo } from 'src/app/models/backend-fetch/menifesto';
import { CompanyInfoFetch } from 'src/app/models/backend-fetch/user-management-fetch';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { BusinessAgreementService } from 'src/app/services/operation-services/dumper-admin/business-agreement.service';
import { InitiateProjectOperationService } from 'src/app/services/operation-services/initiate-project-operation.service';
import { MenifestoService } from 'src/app/services/operation-services/menifesto.service';
import { UserMangementOperatinService } from 'src/app/services/operation-services/user-mangement-operatin.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { SelectAgreementPopupComponent } from '../../initiate-project/select-agreement-popup/select-agreement-popup.component';

@Component({
    selector: 'app-manualmenifesto-tab',
    templateUrl: './manualmenifesto-tab.component.html',
    styleUrls: ['./manualmenifesto-tab.component.css']
})
export class ManualmenifestoTabComponent implements OnInit {

    @Input()
    manifesto!: MenifestoInfo;

    @Input()
    public switchToMenifestoList!: () => void;

    @Input()
    flag: boolean = false;

    @Input()
    manualManifesto!: MenifestoInfo;

    @Input()
    manifestoInfoList!: MenifestoInfo[];

    @Input()
    agreementList!: AgreementInfoFetch[];

    constructor(private menifestoService: MenifestoService, private utilService: UtilService, private languageService: LanguageService, private matDialog: MatDialog, public companySettingsOperationService: CompanySettingsOperationService, private businessAgreementService: BusinessAgreementService, private breakpointObserver: BreakpointObserver, private initiateProjectOperationService: InitiateProjectOperationService, @Inject(MAT_DIALOG_DATA) public data: any, private userMangementOperatinService: UserMangementOperatinService) { }

    agreementPopupSaveDetails: AgreementPopupSaveDetails = {
        selectAgreement: [],
        selectDiposalList: [],
        selectProceessList: [],
        selectedWasteItemList: []
    }

    viewComponent = false;
    // isSelectAgreement: boolean = false;
    componentCode!: string;
    isSystemAdmin: boolean = false;
    companyId = this.utilService.getCompanyIdCookie();

    generatedManifesto: string = AppConstant.MANIFESTO_TYPE_GENERATED;
    manualManifestoType: string = AppConstant.MANIFESTO_TYPE_MANUAL;
    isAgrementDetails: boolean = true;
    popupData: boolean = false

    ngOnInit(): void {
        this.componentCode = AppConstant.COMP.MANUAL_MANIFESTO_TAB;
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();

        if (this.data && this.data.manifestoData) {
            this.manualManifesto = this.data.manifestoData
            this.popupData = this.data.flag;
            if (this.manualManifesto.projectId) {
                this.isAgrementDetails = false;
            }

        } else if (this.manifesto && this.flag) {
            this.manualManifesto = this.manifesto
            this.popupData = this.flag;

        } else {
            this.popupData = false;
        }

        if (!this.popupData && !this.manualManifesto.projectId) {
            var manifestoCreatorCompanyId: string = (this.manualManifesto.creatorCompanyId) ? this.manualManifesto.creatorCompanyId : this.companyId;
            this.manualManifesto.creatorCompanyId = manifestoCreatorCompanyId;
            this.getCreatorCompany(manifestoCreatorCompanyId, () => {

                var creatorRole: string = this.getCreatorRole(this.manualManifesto.aggrementInfo, manifestoCreatorCompanyId);
                this.manualManifesto.creatorRole = creatorRole;
                this.creatorCompanyInfo.companyBusinessCategory = (this.creatorCompanyInfo && this.creatorCompanyInfo.companyBusinessCategory) ? this.creatorCompanyInfo.companyBusinessCategory : [];
                this.manualManifesto.companyCategorySelection = this.initiateProjectOperationService.prepareCompanyCategorySelection(this.creatorCompanyInfo.companyBusinessCategory, creatorRole);

                if (!creatorRole) {
                    this.setDefaultRole(this.manualManifesto.companyCategorySelection);
                }

                this.viewComponent = true;
            })

        } else {

            this.viewComponent = true;
        }

    }

    setDefaultRole(companyCategorySelection: CompanyCategorySelection[]) {
        companyCategorySelection.forEach((eachCategory, index) => {

            if (companyCategorySelection[index].isSelected) {
                this.manualManifesto.creatorRole = eachCategory.title;

            }
        });
    }

    getCreatorRole(agreementInfoUpdate: AgreementInfoUpdate, manifestoCreatorCompanyId: string) {
        var creatorRole: string = "";
        if (agreementInfoUpdate) {
            if (agreementInfoUpdate && agreementInfoUpdate.dumperPartnerInfo && agreementInfoUpdate.dumperPartnerInfo.companyId == manifestoCreatorCompanyId) {
                creatorRole = agreementInfoUpdate.dumperPartnerInfo.assignedRoles;

            } else if (agreementInfoUpdate && agreementInfoUpdate.transporterPartnerInfo && agreementInfoUpdate.transporterPartnerInfo.companyId == manifestoCreatorCompanyId) {
                creatorRole = agreementInfoUpdate.transporterPartnerInfo.assignedRoles;

            } else if (agreementInfoUpdate && agreementInfoUpdate.processorPartnerInfo && agreementInfoUpdate.processorPartnerInfo.companyId == manifestoCreatorCompanyId) {
                creatorRole = agreementInfoUpdate.processorPartnerInfo.assignedRoles;
            }
        }

        return creatorRole;
    }

    creatorCompanyInfo: CompanyInfoFetch = {} as CompanyInfoFetch;
    getCreatorCompany(manifestoCreatorCompanyId: string, callBack: any) {

        this.userMangementOperatinService.getCompanyInfo(manifestoCreatorCompanyId).subscribe((company) => {
            if (company) {
                this.creatorCompanyInfo = company;
            }

            callBack();

        });
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    prepareManualManifestoAgreementFromSelectedAgreement(agreementDetailList: AgreementInfoUpdate[]) {
        var preparedAgreement: AgreementInfoUpdate = {} as AgreementInfoUpdate;
        if (agreementDetailList) {
            preparedAgreement = agreementDetailList[0];
            preparedAgreement.title = agreementDetailList.map(a => a.title).join(", ");

            var creatorPartner: AgreementPartnerInfo = {} as AgreementPartnerInfo;
            var firstPartner: AgreementPartnerInfo = {} as AgreementPartnerInfo;
            var secondPartner: AgreementPartnerInfo = {} as AgreementPartnerInfo;

            for (let index = 0; index < agreementDetailList.length; index++) {
                const eachAgreement: AgreementInfoUpdate = agreementDetailList[index];
                if (index > 0) {
                    preparedAgreement.agreementWasteTransportInfo.push(...eachAgreement.agreementWasteTransportInfo);
                    preparedAgreement.agreementWasteProcessInfo.push(...eachAgreement.agreementWasteProcessInfo);
                }

                if (!creatorPartner.companyId) {
                    if (eachAgreement.dumperPartnerInfo && eachAgreement.dumperPartnerInfo.companyId && eachAgreement.dumperPartnerInfo.assignedRoles == this.manualManifesto.creatorRole) {
                        creatorPartner = eachAgreement.dumperPartnerInfo;

                    } else if (eachAgreement.transporterPartnerInfo && eachAgreement.transporterPartnerInfo.companyId && eachAgreement.transporterPartnerInfo.assignedRoles == this.manualManifesto.creatorRole) {
                        creatorPartner = eachAgreement.transporterPartnerInfo;

                    } else if (eachAgreement.processorPartnerInfo && eachAgreement.processorPartnerInfo.companyId && eachAgreement.processorPartnerInfo.assignedRoles == this.manualManifesto.creatorRole) {
                        creatorPartner = eachAgreement.processorPartnerInfo;

                    }
                }

                if (!firstPartner.companyId && creatorPartner.companyId) {
                    if (eachAgreement.dumperPartnerInfo && eachAgreement.dumperPartnerInfo.companyId && eachAgreement.dumperPartnerInfo.assignedRoles != this.manualManifesto.creatorRole) {
                        firstPartner = eachAgreement.dumperPartnerInfo;

                    } else if (eachAgreement.transporterPartnerInfo && eachAgreement.transporterPartnerInfo.companyId && eachAgreement.transporterPartnerInfo.assignedRoles != this.manualManifesto.creatorRole) {
                        firstPartner = eachAgreement.transporterPartnerInfo;

                    } else if (eachAgreement.processorPartnerInfo && eachAgreement.processorPartnerInfo.companyId && eachAgreement.processorPartnerInfo.assignedRoles != this.manualManifesto.creatorRole) {
                        firstPartner = eachAgreement.processorPartnerInfo;

                    }
                }

                if (!secondPartner.companyId && firstPartner.companyId && creatorPartner.companyId) {
                    if (eachAgreement.dumperPartnerInfo && eachAgreement.dumperPartnerInfo.companyId && eachAgreement.dumperPartnerInfo.assignedRoles != creatorPartner.assignedRoles && eachAgreement.dumperPartnerInfo.assignedRoles != firstPartner.assignedRoles) {
                        secondPartner = eachAgreement.dumperPartnerInfo;

                    } else if (eachAgreement.transporterPartnerInfo && eachAgreement.transporterPartnerInfo.companyId && eachAgreement.transporterPartnerInfo.assignedRoles != creatorPartner.assignedRoles && eachAgreement.transporterPartnerInfo.assignedRoles != firstPartner.assignedRoles) {
                        secondPartner = eachAgreement.transporterPartnerInfo;

                    } else if (eachAgreement.processorPartnerInfo && eachAgreement.processorPartnerInfo.companyId && eachAgreement.processorPartnerInfo.assignedRoles != creatorPartner.assignedRoles && eachAgreement.processorPartnerInfo.assignedRoles != firstPartner.assignedRoles) {
                        secondPartner = eachAgreement.processorPartnerInfo;

                    }
                }
            }

            preparedAgreement.dumperPartnerInfo = (creatorPartner.assignedRoles == AppConstant.CATEGORY_NAME_DUMPER) ? creatorPartner : ((firstPartner.assignedRoles == AppConstant.CATEGORY_NAME_DUMPER) ? firstPartner : secondPartner);

            preparedAgreement.transporterPartnerInfo = (creatorPartner.assignedRoles == AppConstant.CATEGORY_NAME_TRANSPORTER) ? creatorPartner : ((firstPartner.assignedRoles == AppConstant.CATEGORY_NAME_TRANSPORTER) ? firstPartner : secondPartner);

            preparedAgreement.processorPartnerInfo = (creatorPartner.assignedRoles == AppConstant.CATEGORY_NAME_PROCESSOR) ? creatorPartner : ((firstPartner.assignedRoles == AppConstant.CATEGORY_NAME_PROCESSOR) ? firstPartner : secondPartner);



        }

        return preparedAgreement;

    }

    prepareManualManifestoAgreementIds(agreementDetailList: AgreementInfoUpdate[]) {
        var agreementIds: string[] = [];
        if (agreementDetailList) {
            agreementIds = agreementDetailList.map(a => a.agreementId);
        }

        return agreementIds;
    }



    selectAgreementPopupOpen() {
        var agreementData: AgreementPopupView = {
            projectInfo: null,
            agreementList: this.agreementList,
            selectedAgreementIds: [],
            creatorRole: "",
            partnerRole: "",
        };

        if (this.manualManifesto.creatorRole) {
            var selectedAgreementIds = (this.manualManifesto.agreementIds) ? this.manualManifesto.agreementIds : [];
            const partnerRole: any = this.initiateProjectOperationService.getPartnerRole(this.manualManifesto.creatorRole);

            this.initiateProjectOperationService.prepareDataForSelectAgreementPopup(this.companyId, this.manualManifesto.creatorRole, null, selectedAgreementIds, partnerRole, AppConstant.INITIAL_SEARCH_TEXT, AppConstant.INITIAL_PAGE_NO, (agreementData: AgreementPopupView) => {
                agreementData.creatorRole = (this.manualManifesto.creatorRole) ? this.manualManifesto.creatorRole : "";
                agreementData.partnerRole = partnerRole;

                const dialogRef = this.matDialog.open(SelectAgreementPopupComponent, {
                    width: '85%',
                    data: JSON.parse(JSON.stringify(agreementData)),
                    disableClose: true
                });

                dialogRef.afterClosed().subscribe((result: AgreementPopupSaveDetails) => {

                    if (result) {
                        this.manualManifesto.agreementIds = result.selectAgreement.map(a => a.agreementId);
                        this.agreementPopupSaveDetails.selectAgreement = result.selectAgreement;
                        this.agreementPopupSaveDetails.selectDiposalList = result.selectDiposalList;
                        this.agreementPopupSaveDetails.selectedWasteItemList = result.selectedWasteItemList;

                        this.fetchSelectedAgreements(this.agreementPopupSaveDetails.selectAgreement, (agreementDetailList: AgreementInfoUpdate[]) => {
                            this.agreementInfo = this.prepareManualManifestoAgreementFromSelectedAgreement(agreementDetailList);
                            this.manualManifesto.aggrementInfo = this.agreementInfo;

                            if (this.manualManifesto.manifestoType == AppConstant.MANIFESTO_TYPE_MANUAL) {
                                this.manualManifesto.agreementIds = this.prepareManualManifestoAgreementIds(agreementDetailList);
                            }

                            this.manualManifesto.manualManifesto.manifestoDisposeWasteInfo = this.prepareDisposalWasteList(this.agreementPopupSaveDetails.selectDiposalList);

                            this.manualManifesto.manualManifesto.manifestoProcessWasteInfo = this.prepareProcessList(this.agreementPopupSaveDetails.selectDiposalList, this.agreementPopupSaveDetails.selectedWasteItemList, this.agreementInfo);

                            this.manualManifesto.manualManifesto.dumperInfo = this.prepareManualManiufestoDumperInfo(this.agreementInfo);
                            this.manualManifesto.manualManifesto.processorInfo = this.prepareManualManiufestoProcessorInfo(this.agreementInfo);
                            this.manualManifesto.manualManifesto.transportInfo = this.prepareManualManiufestoTransporterInfo(this.agreementInfo);
                        });

                    }

                });
            });
        } else {
            this.utilService.showSnackbar("Please select creator role", 3000);
        }


        // const dialogRef = this.matDialog.open(SelectAgreementPopupComponent, {
        //     width: '85%',
        //     data: agreementData,
        //     disableClose: true
        // });

        // dialogRef.afterClosed().subscribe(result => {

        //     if (result) {
        //         this.agreementPopupSaveDetails.selectAgreement = result.selectAgreement;

        //         this.getAgreementInfo();

        //         this.agreementPopupSaveDetails.selectDiposalList = result.selectDiposalList;

        //         this.agreementPopupSaveDetails.selectedWasteItemList = result.selectedWasteItemList;


        //     }
        // });

    }

    agreementInfo!: AgreementInfoUpdate;

    fetchSelectedAgreements(selectAgreement: AgreementInfoFetch[], callBack: any) {
        if (selectAgreement) {
            var agreementDetailList: AgreementInfoUpdate[] = [];
            var callBackCount = 0;
            selectAgreement.forEach(eachAgreement => {
                this.businessAgreementService.getAgreementInfoForManifestoOp(eachAgreement.agreementId).subscribe(data => {

                    if (data) {
                        agreementDetailList.push(data);
                    }

                    callBackCount++;
                    if (callBackCount == selectAgreement.length) {
                        callBack(agreementDetailList);
                    }

                });
            })


        }
    }

    prepareManualManiufestoDumperInfo(agreementInfo: AgreementInfoUpdate): DumperInfo {
        var dumperInfo: DumperInfo = {
            companyId: '',
            personInChargerId: '',
            personInchargeEmail: '',
            personName: '',
            businessName: '',
            zipCode: '',
            address: '',
            contactNo: '',
            workPlace: '',
            workZip: '',
            workAddress: '',
            workContactNo: ''

        }
        if (agreementInfo) {

            var agrementDumperInfo: AgreementPartnerInfo = this.prepareCompanyCategory(this.agreementInfo, AppConstant.CATEGORY_NAME_DUMPER)
            dumperInfo.companyId = agrementDumperInfo.companyId;
            dumperInfo.personInChargerId = agrementDumperInfo.personInChargeId;
            dumperInfo.personInchargeEmail = agrementDumperInfo.personInchargeEmail;
            dumperInfo.personName = agrementDumperInfo.personInChargeName;
            dumperInfo.businessName = agrementDumperInfo.companyName;
            dumperInfo.zipCode = agrementDumperInfo.companyZipCode;
            dumperInfo.address = agrementDumperInfo.companyAddress;
            dumperInfo.contactNo = agrementDumperInfo.contactNo;

        }
        return dumperInfo;


    }

    prepareManualManiufestoProcessorInfo(agreementInfo: AgreementInfoUpdate): ProcessorInfo {
        var procssorInfo: ProcessorInfo = {
            companyId: '',
            personInChargerId: '',
            personInchargeEmail: '',
            personName: '',
            businessName: '',
            zipCode: '',
            address: '',
            contactNo: '',
            processingComplateDate: '',
            disposeComplateDate: '',
            processingComplateDateView: '',
            disposeComplateDateView: '',
            processingComplateDateC2: '',
            processingComplateDateC2View: '',
            finalDisposeComplateDate: '',
            finalDisposeComplateDateView: ''
        }
        if (agreementInfo) {

            var agrementDumperInfo: AgreementPartnerInfo = this.prepareCompanyCategory(this.agreementInfo, AppConstant.CATEGORY_NAME_PROCESSOR)
            procssorInfo.companyId = agrementDumperInfo.companyId;
            procssorInfo.personInChargerId = agrementDumperInfo.personInChargeId;
            procssorInfo.personInchargeEmail = agrementDumperInfo.personInchargeEmail;
            procssorInfo.personName = agrementDumperInfo.personInChargeName;
            procssorInfo.businessName = agrementDumperInfo.companyName;
            procssorInfo.zipCode = agrementDumperInfo.companyZipCode;
            procssorInfo.address = agrementDumperInfo.companyAddress;
            procssorInfo.contactNo = agrementDumperInfo.contactNo;

        }
        return procssorInfo;


    }

    prepareManualManiufestoTransporterInfo(agreementInfo: AgreementInfoUpdate): TransportInfo {
        var transporterInfo: TransportInfo = {
            companyId: '',
            personInChargerId: '',
            personInchargeEmail: '',
            personName: '',
            businessName: '',
            zipCode: '',
            address: '',
            contactNo: '',
            vehicleNo: '',
            vehicleType: '',
            transportMethod: '',
            transportComplateDate: '',
            driverName: '',
            transportComplateDateView: '',
            transportComplateDateB2: '',
            transportComplateDateB2View: ''
        }

        if (agreementInfo) {
            var agrementDumperInfo: AgreementPartnerInfo = this.prepareCompanyCategory(this.agreementInfo, AppConstant.CATEGORY_NAME_TRANSPORTER)
            transporterInfo.companyId = agrementDumperInfo.companyId;
            transporterInfo.personInChargerId = agrementDumperInfo.personInChargeId;
            transporterInfo.personInchargeEmail = agrementDumperInfo.personInchargeEmail;
            transporterInfo.personName = agrementDumperInfo.personInChargeName;
            transporterInfo.businessName = agrementDumperInfo.companyName;
            transporterInfo.zipCode = agrementDumperInfo.companyZipCode;
            transporterInfo.address = agrementDumperInfo.companyAddress;
            transporterInfo.contactNo = agrementDumperInfo.contactNo;

        }
        return transporterInfo;


    }

    resetManifestoInfo() {
        this.manualManifesto = {
            menifestoInfoId: '',
            menifestoUniqueId: '',
            date: '',
            dateView: '',
            projectId: '',
            tripIds: [],
            tripIdDef: [],
            pickIdDef: [],
            wasteId: '',
            projectName: '',
            creator: '',
            firstParty: '',
            secondparty: '',
            aggrementInfo: {
                agreementId: '',
                title: '',
                createDate: '',
                createDateView: '',
                validDate: '',
                validDateView: '',
                agreementType: '',
                agreementStatus: {
                    statusId: '',
                    statusTitle: '',
                },

                dumperPartnerInfo: {
                    agreementPartnerInfoId: '',
                    companyId: '',
                    companyName: '',
                    companyZipCode: '',
                    companyZipCodeFormated: '',
                    companyAddress: '',
                    contactNo: '',
                    contactNoFormated: '',
                    personInChargeId: '',
                    personInChargeName: '',
                    personInchargeEmail: '',
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
                        companyId: '',
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
                    accountType: '',
                    assignedRoles: '',
                    companyBusinessCategory: [],
                    companyRoleSelection: [false, false, false],
                    isApprovalDone: false,
                    companyCategorySelection: JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory)),
                    roleIndex: -1,
                    paymentMethodSelection: AppConstant.AGREEMENT_PARTNER_PAYMENT_METHOD,
                    bankPayment: true
                },
                transporterPartnerInfo: {} as AgreementPartnerInfo,
                processorPartnerInfo: {} as AgreementPartnerInfo,
                agreementWasteTransportInfo: [],
                agreementWasteProcessInfo: [],

                agreementRemark: '',

            },
            menifestoStatus: '',
            manualManifesto: {
                date: '',
                dateView: '',
                deliveryNo: '',
                manifestoNo: '',
                refNo: '',
                dumperInfo: {
                    companyId: '',
                    personInChargerId: '',
                    personInchargeEmail: '',
                    personName: '',
                    businessName: '',
                    zipCode: '',
                    address: '',
                    contactNo: '',
                    workPlace: '',
                    workZip: '',
                    workAddress: '',
                    workContactNo: '',
                },
                manifestoDisposeWasteInfo: [
                    {
                        collectionId: '',
                        wasteId: '',
                        wasteName: '',
                        unit: '',
                        shape: '',
                        wastePackage: '',
                        quantity: 0,
                        transportPrice: 0
                    }
                ],
                manifestoProcessWasteInfo: [
                    {
                        collectionId: '',
                        wasteId: '',
                        wasteName: '',
                        unit: '',
                        shape: '',
                        wastePackage: '',
                        quantity: 0,
                        establishedQuantity: 0,
                        processPrice: 0,
                    }
                ],
                transhipmentInfo: {
                    storageName: '',
                    inCharge: '',
                    zipCode: '',
                    address: '',
                },
                transportInfo: {
                    companyId: '',
                    personInChargerId: '',
                    personInchargeEmail: '',
                    personName: '',
                    businessName: '',
                    zipCode: '',
                    address: '',
                    contactNo: '',
                    vehicleNo: '',
                    vehicleType: '',
                    transportMethod: '',
                    transportComplateDate: '',
                    transportComplateDateView: '',
                    transportComplateDateB2: '',
                    transportComplateDateB2View: '',
                    driverName: '',
                },
                totalQuantity: 0,
                processorInfo: {
                    companyId: '',
                    personInChargerId: '',
                    personInchargeEmail: '',
                    personName: '',
                    businessName: '',
                    zipCode: '',
                    address: '',
                    contactNo: '',
                    processingComplateDate: '',
                    processingComplateDateView: '',
                    processingComplateDateC2: '',
                    processingComplateDateC2View: '',
                    disposeComplateDate: '',
                    disposeComplateDateView: '',
                    finalDisposeComplateDate: '',
                    finalDisposeComplateDateView: ''
                },
                additionalInfo: '',
            },
            manifestoType: '',
            manualEdit: true,
            isCheck: false,
            invoiceGenerated: false,
            project: {} as ProjectInfoFetch
        }
    }

    prepareCompanyCategory(agreementInfo: AgreementInfoUpdate, category: string) {
        var partnerInfo: AgreementPartnerInfo = {
            agreementPartnerInfoId: '',
            companyId: '',
            companyName: '',
            companyZipCode: '',
            companyZipCodeFormated: '',
            companyAddress: '',
            contactNo: '',
            contactNoFormated: '',
            personInChargeId: '',
            personInChargeName: '',
            accountantInfo: {
                companyId: '',
                accountantId: '',
                accountantName: '',
                accountantEmail: '',
                contactNo: '',
                contactNoFormated: '',
                invoiceClosingDate: '',
                invoicePaymentDate: '',
                paymentMode: []
            },
            accountInfo: {
                companyId: '',
                bankAccountId: '',
                bankName: '',
                branchName: '',
                accountNumber: '',
                accountName: ''
            },
            otherBankAccountInfo: {
                companyId: '',
                bankAccountId: '',
                bankName: '',
                branchName: '',
                accountNumber: '',
                accountName: '',
            },
            accountType: '',
            assignedRoles: '',
            companyBusinessCategory: [],
            companyRoleSelection: [],
            isApprovalDone: false,
            personInchargeEmail: '',
            companyCategorySelection: JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory)),
            roleIndex: -1,
            paymentMethodSelection: AppConstant.AGREEMENT_PARTNER_PAYMENT_METHOD,
            bankPayment: true
        };
        var dumper: AgreementPartnerInfo = (agreementInfo.dumperPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_DUMPER) ? agreementInfo.dumperPartnerInfo : ((agreementInfo.transporterPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_DUMPER) ? agreementInfo.transporterPartnerInfo : agreementInfo.processorPartnerInfo);

        var transporter: AgreementPartnerInfo = (agreementInfo.dumperPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_TRANSPORTER) ? agreementInfo.dumperPartnerInfo : ((agreementInfo.transporterPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_TRANSPORTER) ? agreementInfo.transporterPartnerInfo : agreementInfo.processorPartnerInfo);

        var processor: AgreementPartnerInfo = (agreementInfo.dumperPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_PROCESSOR) ? agreementInfo.dumperPartnerInfo : ((agreementInfo.transporterPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_PROCESSOR) ? agreementInfo.transporterPartnerInfo : agreementInfo.processorPartnerInfo);

        if (category == AppConstant.CATEGORY_NAME_DUMPER) {
            partnerInfo = dumper;
        } else if (category == AppConstant.CATEGORY_NAME_TRANSPORTER) {
            partnerInfo = transporter;
        } else if (category == AppConstant.CATEGORY_NAME_PROCESSOR) {
            partnerInfo = processor;

        }
        return partnerInfo;

    }

    saveManifesto() {
        var validationReport = this.menifestoService.ManifestoFormValidator(this.manualManifesto);

        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        }
        else {
            if (this.manualManifesto) {
                this.manualManifesto.menifestoInfoId = (this.manualManifesto.menifestoInfoId) ? this.manualManifesto.menifestoInfoId : this.utilService.generateUniqueId();
                this.manualManifesto.menifestoUniqueId = this.manualManifesto.manualManifesto.manifestoNo;
                this.manualManifesto.creator = this.manualManifesto.manualManifesto.dumperInfo.companyId + "|" + AppConstant.CATEGORY_NAME_DUMPER;
                this.manualManifesto.firstParty = this.manualManifesto.manualManifesto.transportInfo.companyId + "|" + AppConstant.CATEGORY_NAME_TRANSPORTER;
                this.manualManifesto.secondparty = this.manualManifesto.manualManifesto.processorInfo.companyId + "|" + AppConstant.CATEGORY_NAME_PROCESSOR;
                if (this.manualManifesto.manifestoType != this.generatedManifesto) {
                    this.manualManifesto.manifestoType = AppConstant.MANIFESTO_TYPE_MANUAL;
                }

                if (this.manualManifesto.manualManifesto.date && this.manualManifesto.manualManifesto.transportInfo.transportComplateDate && this.manualManifesto.manualManifesto.transportInfo.transportComplateDateB2 && this.manualManifesto.menifestoStatus != AppConstant.MENIFESTO_PROCESSING_COMPLETE_STATUS) {

                    this.manualManifesto.menifestoStatus = AppConstant.MENIFESTO_STATUS_LOADED;

                    if (this.manualManifesto.manualManifesto.processorInfo.processingComplateDate && this.manualManifesto.manualManifesto.processorInfo.processingComplateDateC2) {
                        this.manualManifesto.menifestoStatus = AppConstant.MENIFESTO_STATUS_UNLOADED;

                        if (this.manualManifesto.manifestoType == AppConstant.MANIFESTO_TYPE_MANUAL && this.manualManifesto.manualManifesto.processorInfo.disposeComplateDate && this.manualManifesto.manualManifesto.processorInfo.finalDisposeComplateDate) {
                            this.manualManifesto.menifestoStatus = AppConstant.MENIFESTO_PROCESSING_COMPLETE_STATUS;
                        }
                    }
                } else {
                    this.manualManifesto.menifestoStatus = AppConstant.MENIFESTO_STATUS_LOADED;
                }

                this.manualManifesto.manualEdit = true;
                // console.log((JSON.stringify(this.manualManifesto)))

                this.menifestoService.saveMenifestoInfo(this.manualManifesto).subscribe((menifesto) => {
                    if (menifesto) {
                        this.updateMainManifestoList(menifesto);
                        this.resetManifestoInfo();
                        this.utilService.showSnackbar("Manifesto Saved", 3000);
                    }
                })

            }
        }


    }

    updateMainManifestoList(manualManifesto: MenifestoInfo) {
        let itemIndex = this.manifestoInfoList.findIndex(item => item.menifestoInfoId == manualManifesto.menifestoInfoId);
        if (itemIndex >= 0) {
            this.manifestoInfoList[itemIndex] = manualManifesto;
        } else {
            this.manifestoInfoList.unshift(manualManifesto);
        }
    }

    prepareDisposalWasteList(disposalList: DisposalInfoFetch[]): ManifestoDisposeWasteInfo[] {
        var disposalWasteList: ManifestoDisposeWasteInfo[] = [];
        if (disposalList) {
            disposalList.forEach((waste) => {
                var disposalwaste: ManifestoDisposeWasteInfo = {
                    collectionId: '',
                    wasteId: '',
                    wasteName: '',
                    unit: '',
                    shape: '',
                    wastePackage: '',
                    quantity: 0,
                    transportPrice: 0
                }
                disposalwaste.collectionId = waste.collectionId;
                disposalwaste.wasteId = waste.wasteItemId;
                disposalwaste.wasteName = waste.wasteItemName;
                disposalwaste.unit = waste.unit;
                disposalwaste.shape = waste.wasteShape;
                disposalwaste.wastePackage = waste.wastePackage;
                disposalwaste.quantity = waste.quantity;
                disposalwaste.transportPrice = waste.price;

                disposalWasteList.push(disposalwaste);
            })

        }
        return disposalWasteList
    }

    prepareProcessList(disposalList: DisposalInfoFetch[], wastelist: wasteItemInfo[], agreementInfo: AgreementInfoUpdate): ManifestoProcessWasteInfo[] {

        var processWasteList: ManifestoProcessWasteInfo[] = [];
        if (wastelist) {
            wastelist.forEach((waste) => {
                var processWaste: ManifestoProcessWasteInfo = {
                    collectionId: '',
                    wasteId: '',
                    wasteName: '',
                    unit: '',
                    shape: '',
                    wastePackage: '',
                    quantity: 0,
                    establishedQuantity: 0,
                    processPrice: 0
                }
                if (disposalList) {
                    disposalList.forEach((disposal) => {
                        if (waste.wasteItemId == disposal.wasteItemId) {
                            processWaste.wasteId = disposal.wasteItemId;
                            processWaste.wasteName = disposal.wasteItemName;
                            processWaste.unit = disposal.unit;
                            processWaste.shape = disposal.wasteShape;
                            processWaste.wastePackage = disposal.wastePackage;
                            processWaste.quantity = 0;

                            processWaste.establishedQuantity = 0;
                            processWaste.processPrice = 0;
                        }
                    })
                }

                agreementInfo.agreementWasteProcessInfo.forEach(eachItem => {
                    if (eachItem.wasteDefId == waste.wasteItemId) {
                        processWaste.processPrice = eachItem.price;
                    }
                })
                processWasteList.push(processWaste);
            })
        }
        return processWasteList
    }



    prepareProcessQuantity(disposalList: ManifestoDisposeWasteInfo[], wasteId: string, wastelist: ManifestoProcessWasteInfo[]) {
        wastelist.forEach(waste => {
            if (wasteId == waste.wasteId) {
                waste.quantity = 0;
                disposalList.forEach(disposal => {
                    if (wasteId == disposal.wasteId) {
                        waste.quantity += disposal.quantity;
                    }

                })
            }

        });

    }

    SearchZipCodeData(zipCode: string) {
        if (zipCode) {

            this.companySettingsOperationService.getZipCodeInformation(zipCode).subscribe((data) => {
                if (data) {
                    this.manualManifesto.manualManifesto.dumperInfo.workAddress = data.address;
                }
                data

            });
        }

    }
    onClickMenifestoListBtn() {
        this.switchToMenifestoList();
    }

    updateCreatorRoleSelection(eachCategory: any, categoryIndex: number) {

        if (this.popupData || !eachCategory.isDisable || eachCategory.title == this.manualManifesto.creatorRole || this.manualManifesto.creatorCompanyId != this.companyId || (this.manualManifesto.creatorCompanyId == this.companyId && this.manualManifesto.menifestoInfoId)) {
            return;
        }

        eachCategory.isSelected = (eachCategory.isSelected) ? false : true;
        if (eachCategory.isSelected) {
            this.manualManifesto.creatorRole = eachCategory.title;
        }

        if (this.manualManifesto.companyCategorySelection) {
            this.manualManifesto.companyCategorySelection.forEach((each, index) => {
                if (categoryIndex != index) {
                    each.isSelected = false;
                }
            })
        }

    }

    uiLabels: any = {
        agreementInfo: "Agreement Info",
        agreementBtn: "Select Agreement",
        agreementTitle: "Agreement Title",
        projectTitle: "Project Title",
        dumperCompanyName: "Dumper Company Name",
        processorCompanyName: "Processor Company Name",
        transportCompanyName: "Transport Company Name",
        manifestoNo: "Manifesto No",
        deliveryNo: "Delivery No",
        deliveryDate: "Delivery Date",
        dumperInfo: "A (Dumper Info)",
        transporterInfo1: "B1 (Transporter Info)",
        transporterInfo2: "B2 (Transporter Info)",
        inCharge: "Person In Charge",
        businessname: "Business Name",
        zipcode: "Zip Code",
        address: "Address",
        pickZipcode: "Pick Zip Code",
        pickAddress: "Pick Address",
        contactNo: "Contact No",
        workPlaceName: "Work Place Name",
        wasteName: "Waste Name",
        unit: "Unit",
        quantity: "Waste Quantity",
        establishQuantity: "Established Quantity",
        totalQuantity: "Total Quantity",
        shape: "Shape",
        package: "Packaging",
        transShipment: "Transshipment",
        vehicleNo: "Vehicle No",
        vehicletype: "Vehicle Type",
        transportMethod: "Transport Method",
        processorInfo1: "C1 (Processor Info)",
        processorInfo2: "C2 (Processor Info)",
        dInfo: "D",
        eInfo: "E",
        additionalInfo: "Additional Info",
        transportComDate: "Complate Date",
        processComDate: "Complate Date",
        finalDisposalComplateDate: "Disposal Complate Date",
        saveBtn: "Save",
        wasteListHeader: "Waste List"

    }
}
