import { Component, Input, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { AgreementInfoFetch, ProjectInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { FormProcessingListTable, ManifestFilter, MenifestoInfo, SearchDate } from 'src/app/models/backend-fetch/menifesto';
import { InitiateProjectOperationService } from 'src/app/services/operation-services/initiate-project-operation.service';
import { LoadUnloadService } from 'src/app/services/operation-services/load-unload.service';
import { MenifestoService } from 'src/app/services/operation-services/menifesto.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-menifesto-tab',
    templateUrl: './menifesto-tab.component.html',
    styleUrls: ['./menifesto-tab.component.css']
})
export class MenifestoTabComponent implements OnInit {


    @Input()
    fromProject: boolean = false;

    @Input()
    projectProcessDef: any;

    @Input()
    projectViewPopupOpen!: (project: ProjectInfoFetch) => void;

    @Input()
    tabChangeForCopyProject!: (project: ProjectInfoFetch) => void;

    @Input()
    tabChangeForEditProject!: (project: ProjectInfoFetch, selectedProcess?: any) => void;

    @Input()
    viewSchedulePopupOpen!: (project: ProjectInfoFetch) => void;

    @Input()
    redirectToCreateSchedule!: (project: ProjectInfoFetch) => void;

    @Input()
    redirectToProcessCompletion!: () => void;

    companyId: string = this.utilService.getCompanyIdCookie();

    startDate: string = "";
    endDate: string = "";

    constructor(private menifestoService: MenifestoService, private utilService: UtilService, private languageService: LanguageService, private initiateProjectOperationService: InitiateProjectOperationService, private loadUnloadService: LoadUnloadService) { }

    agreementList!: AgreementInfoFetch[];
    manifestoInfoList: MenifestoInfo[] = []
    selectedManifesto: MenifestoInfo = {} as MenifestoInfo;
    selectedManifestoList: MenifestoInfo[] = [];
    checkedManifesto: MenifestoInfo[] = [];

    listOfTable: FormProcessingListTable[] = [];

    viewComponent = false;

    componentCode!: string;
    isSystemAdmin: boolean = false;
    menifestoTabView: boolean = true;
    addMenifestoTabView: boolean = false;
    formProcessingTabView: boolean = false

    manifestFilter: ManifestFilter = {
        selectedIndex: AppConstant.MENIFESTO_PROGRESS_FILTER
    }

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.MANIFESTO_TABS;
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        if (!this.fromProject) {
            this.getCurrentDate();
        } else {
            this.searchDate.companyId = this.utilService.getCompanyIdCookie();
            this.viewComponent = true;
        }
    }

    searchDate: SearchDate = {
        companyId: "",
        startDate: "",
        endDate: "",
    }

    getManifestoList() {

        this.menifestoService.getMenifestoInitialInfo(this.searchDate, AppConstant.INITIAL_PAGE_NO, AppConstant.INITIAL_SEARCH_TEXT, AppConstant.MENIFESTO_PROGRESS_FILTER).subscribe((menifesto) => {

            if (menifesto) {
                this.manifestoInfoList = menifesto;
                this.selectedItem = this.manifestoInfoList[0];

            }
            // this.selectTab(0, this.manualManifesto);
            this.viewComponent = true;

        })
    }

    getAgreementList() {

        this.initiateProjectOperationService.getAgreementList(this.companyId).subscribe((data) => {
            if (data) {
                this.agreementList = data.agreementList;
            }

            this.getManifestoList();

        });
    }

    getCurrentDate() {

        this.loadUnloadService.getCurrentDate().subscribe(response => {
            if (response) {
                this.endDate = response.date;
                this.startDate = this.getStartDate(this.endDate);
                this.searchDate.companyId = this.companyId;
                this.searchDate.startDate = this.startDate;
                this.searchDate.endDate = this.endDate;
            }

            this.getAgreementList();
        });
    }

    getStartDate(date: string): string {
        var endDate: string = "";
        if (date) {

            var language = this.utilService.getSelectedLanguageIndex();
            if (language == AppConstant.LANG_INDEX_ENG) {
                var first = date.slice(0, 8);
                var second = date.slice(10, 19);
                endDate = first.concat("01") + second;
            } else if (language == AppConstant.LANG_INDEX_JPN) {
                var first = date.slice(0, 6);
                var second = date.slice(8, 17);
                endDate = first.concat("01") + second;
            }

        }
        return endDate;
    }
    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    selectedIndex = 0;
    indexChange(index: any) {
        this.manifestFilter.selectedIndex = AppConstant.MENIFESTO_PROGRESS_FILTER;
        this.selectedIndex = index;
        if (index == 0) {
            this.checkedManifesto = [];
            this.getManifestoList();
        }
        else {
            this.manualManifesto = JSON.parse(JSON.stringify(this.manualManifesto));
        }

    }

    prepareSelectedManifestoList(manifestoList: MenifestoInfo[]): MenifestoInfo[] {
        var selectedManifestoList: MenifestoInfo[] = [];
        if (manifestoList) {
            manifestoList.forEach(manifesto => {
                if (manifesto.isCheck == true)
                    selectedManifestoList.push(manifesto);
            })
        }
        return selectedManifestoList;
    }

    public changeTab = (index: number, manifestoInfoList: MenifestoInfo[]): void => {

        this.selectedIndex = index;

        this.selectedManifestoList = this.prepareSelectedManifestoList(manifestoInfoList);
        this.listOfTable = this.prepareListForTable(this.selectedManifestoList);
        this.switchToTab(index);

    }
    public selectTab = (index: number, menifesto: MenifestoInfo): void => {
        this.selectedIndex = index;
        if (menifesto && menifesto.menifestoInfoId) {
            this.menifestoService.getMenifestoDetailInfo(menifesto.menifestoInfoId).subscribe(menifestoResponse => {
                this.manualManifesto = JSON.parse(JSON.stringify(menifestoResponse));
                this.switchToTab(index);
            });
        } else {
            this.manualManifesto = JSON.parse(JSON.stringify(menifesto));
            this.switchToTab(index);
        }

    }

    switchToTab(index: number) {
        if (index == 1) {
            this.menifestoTabView = false;
            this.addMenifestoTabView = true;
            this.formProcessingTabView = false
        } else {
            this.menifestoTabView = false;
            this.addMenifestoTabView = false;
            this.formProcessingTabView = true;
        }
    }


    public switchToMenifestoList = (): void => {
        this.menifestoTabView = true;
        this.addMenifestoTabView = false;
        this.formProcessingTabView = false;

        this.manifestFilter.selectedIndex = AppConstant.MENIFESTO_PROGRESS_FILTER;

    }

    prepareListForTable(manifestoList: MenifestoInfo[]): FormProcessingListTable[] {

        var listTable: FormProcessingListTable[] = [];
        if (manifestoList) {

            manifestoList.forEach(eachManifesto => {
                var tableItem: FormProcessingListTable = {
                    collectionDate: '',
                    issuerName: '',
                    dateOfIssue: '',
                    grandNumber: '',
                    emisionSiteName: '',
                    emisionSiteLocation: '',
                    wasteName: '',
                    recieveAmount: 0,
                    containAsbestos: '',
                    mercuryproducts: '',
                    containMercuryDustetc: '',
                    transportationEnddate: '',
                    transportationmethod: '',
                    destinationName: '',
                    destinationLocation: '',
                    carryingAmount: 0,
                    remarks: ''
                }
                tableItem.collectionDate = eachManifesto.manualManifesto.dateView.substring(0, eachManifesto.manualManifesto.dateView.indexOf(" "));
                tableItem.issuerName = eachManifesto.manualManifesto.dumperInfo.businessName;
                tableItem.dateOfIssue = eachManifesto.manualManifesto.dateView.substring(0, eachManifesto.manualManifesto.dateView.indexOf(" "));
                tableItem.grandNumber = eachManifesto.manualManifesto.manifestoNo;
                tableItem.emisionSiteName = eachManifesto.manualManifesto.dumperInfo.workPlace;
                tableItem.emisionSiteLocation = eachManifesto.manualManifesto.dumperInfo.workAddress;
                tableItem.wasteName = eachManifesto.manualManifesto.manifestoDisposeWasteInfo[0].wasteName;
                tableItem.recieveAmount = eachManifesto.manualManifesto.manifestoDisposeWasteInfo[0].quantity;
                tableItem.containAsbestos = "";
                tableItem.mercuryproducts = "";
                tableItem.containMercuryDustetc = "";
                tableItem.transportationEnddate = eachManifesto.manualManifesto.processorInfo.processingComplateDateC2View.substring(0, eachManifesto.manualManifesto.processorInfo.processingComplateDateC2View.indexOf(" "));
                tableItem.transportationmethod = eachManifesto.manualManifesto.transportInfo.transportMethod;
                tableItem.destinationName = "";
                tableItem.destinationLocation = eachManifesto.manualManifesto.processorInfo.address;
                tableItem.carryingAmount = eachManifesto.manualManifesto.manifestoProcessWasteInfo[0].establishedQuantity;
                tableItem.remarks = eachManifesto.manualManifesto.additionalInfo;


                listTable.push(tableItem);
            })

        }

        return listTable;
    }


    manualManifesto: MenifestoInfo = {
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
            transporterPartnerInfo: {
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
            processorPartnerInfo: {
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
            agreementWasteTransportInfo: [],
            agreementWasteProcessInfo: [],

            agreementRemark: ''
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
                transportComplateDateB2: '',
                transportComplateDateView: '',
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

    uiLabels: any = {
        manifestoListTab: "Manifesto List",
        manualManifestoTab: "Create Manifesto",

    }
}
