import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppConstant } from 'src/app/config/app-constant';
import { PartnerInfo, AgreementInfo, AgreementPartnerInfo, OwnApprovalStatus, AgreementFilter, AgreementStatusUpdate } from 'src/app/models/backend-fetch/business-agreement';
import { ContextUserBasicInfo } from 'src/app/models/backend-fetch/dxr-system';
import { NotificationSetInfo } from 'src/app/models/backend-fetch/notification';
import { BusinessAgreementService } from 'src/app/services/operation-services/dumper-admin/business-agreement.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-business-partner-tabs',
    templateUrl: './business-partner-tabs.component.html',
    styleUrls: ['./business-partner-tabs.component.css']
})
export class BusinessPartnerTabsComponent implements OnInit {

    constructor(private cookieService: CookieService, private businessAgreementService: BusinessAgreementService, private utilService: UtilService, private languageService: LanguageService) { }
    isAgreementListView: boolean = true;
    isCreateAgreementView: boolean = false;
    agreementInfo: AgreementInfo = {
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
            personInchargeEmail: '',
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
                invoiceClosingDate: '',
                invoicePaymentDate: '',
                paymentMode: [],
                contactNo: '',
                contactNoFormated: ''
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
        partnerList: [],
        agreementRemark: '',
        agreementProcessId: '',
        agreementActionId: '',
        processsList: [],
        isApproveRequiredState: false,
        invoiceReceiverComId: '',
        isTransportPriceApply: true,
        isProcessingPriceApply: true,
        agreementInvoiceWasteList: []
    };
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

    uiLabels: any = {
        partnerListTabHeader: 'Partner List',
        agreementListTabHeader: 'Agreement List',
        agreementFormTabHeader: 'Agreement',
    }

    selectedOperationFilter: AgreementFilter = {} as AgreementFilter;

    viewContent = false;
    companyInfo!: PartnerInfo;
    selectedCompanyId: string = '';
    partnerList: PartnerInfo[] = [];
    agreementList: AgreementInfo[] = [];
    agreementProcessDef: any[] = [];
    selectedAgreement: AgreementInfo = {
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
            companyRoleSelection: [],
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
        partnerList: [],
        agreementRemark: '',
        agreementProcessId: '',
        agreementActionId: '',
        processsList: [],
        isApproveRequiredState: false,
        invoiceReceiverComId: '',
        isTransportPriceApply: true,
        isProcessingPriceApply: true,
        agreementInvoiceWasteList: []
    };

    selectedProcess: any;

    isViewMode = false;
    componentCode!: string;
    isSystemAdmin: boolean = false;
    filterItems: AgreementFilter[] = [];
    isValidAgreementTitle: boolean = true;

    ngOnInit(): void {

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.BUSINESS_PARTNER_TABS, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.BUSINESS_PARTNER_TABS;

        this.selectedCompanyId = this.utilService.getCompanyIdCookie() ? this.utilService.getCompanyIdCookie() : '';

        this.getCompanyInfo(this.selectedCompanyId);
    }

    checkAgreementTitleValidity(agreementTitle: string, agreementId: string) {
        this.businessAgreementService.isValidAgreementTitle(agreementTitle, agreementId, (isValid: boolean) => {

            this.isValidAgreementTitle = isValid;
        })
    }

    getCompanyInfo(companyId: string) {
        if (this.selectedCompanyId) {
            this.businessAgreementService.getCompanyInfo(this.selectedCompanyId).subscribe(data => {
                if (data) {
                    this.companyInfo = data;
                }
                this.prepareDumperPartnerInfo();
                this.getCompanyPartner(companyId, AppConstant.INITIAL_PAGE_NO, AppConstant.INITIAL_SEARCH_TEXT, AppConstant.INITIAL_SEARCH_STATUS);
            });
        }
    }


    public getCompanyPartnerFromSearch = (companyId: string, pageNo: number, searchText: string, status: string) => {
        if (companyId) {

            this.businessAgreementService.getPartnerList(companyId, pageNo, searchText, status).subscribe(data => {
                if (data) {

                    this.partnerList = this.businessAgreementService.preparePartnerViewList(data);
                } else {
                    this.partnerList = [];
                }
            });
        }
    }

    getCompanyPartner(companyId: string, pageNo: number, searchText: string, status: string) {
        if (companyId) {

            //     this.businessAgreementService.getPartnerList(companyId, pageNo, searchText, status).subscribe(data => {
            //         if (data) {
            //             // this.partnerList = data;
            //             this.partnerList = this.businessAgreementService.preparePartnerViewList(data);
            //         }

            this.getAgreementList(companyId, AppConstant.INITIAL_PAGE_NO, AppConstant.INITIAL_SEARCH_TEXT, AppConstant.AGREEMENT_INITIALLY_SELECTED_STATUS, true, () => {
                this.viewContent = true;
            });
            //     });
        }
    }

    public getAgreementList = (companyId: string, pageNo: number, searchText: string, status: string, flag: boolean, callBack: any) => {

        if (companyId) {

            this.businessAgreementService.getAgreementInitialInfoList(companyId, pageNo, searchText, status).subscribe(data => {

                if (!data) {
                    data = [];

                }
                this.agreementList = data;
                this.getAgreementProcessDef(data, flag, callBack);
            });
        }
    }

    getAgreementProcessDef(agreementList: AgreementInfo[], initialLoad: boolean, callBack: any) {

        this.businessAgreementService.getAgreementProcessDef().subscribe(data => {
            if (data) {
                this.agreementProcessDef = data;
                this.selectedProcess = this.businessAgreementService.prepareProcessDefForView(this.agreementProcessDef[0], this.selectedCompanyId);
            }

            if (initialLoad) {
                this.prepareFilterItems(Object.assign([], this.agreementProcessDef));
            }

            callBack();
        })
    }

    showAgreementDetails(agreementList: AgreementInfo[], callBack: any) {
        this.prepareAgreementListView(agreementList, callBack);
    }

    prepareAgreementListView(agreementList: AgreementInfo[], callBack: any) {

        var count = 0;

        if (agreementList && agreementList.length > 0) {
            agreementList.forEach(eachAgreement => {
                var ownApprovalStatus: OwnApprovalStatus = {
                    agreementId: eachAgreement.agreementId,
                    companyId: this.companyInfo.companyId,
                    isApproved: false
                }
                this.businessAgreementService.getOwnApprovalStatus(ownApprovalStatus, (data: OwnApprovalStatus) => {
                    if (data) {
                        eachAgreement = this.businessAgreementService.prepareAgreementForView(eachAgreement, this.agreementProcessDef, this.companyInfo.companyId, data.isApproved);
                    }
                    count++;

                    if (count == agreementList.length) {
                        this.agreementList = [];
                        this.agreementList = agreementList;
                        callBack();
                    }
                });

            });
        } else {
            this.agreementList = [];
            callBack();
        }
    }

    prepareDumperPartnerInfo() {

        if (this.companyInfo) {
            this.selectedAgreement.dumperPartnerInfo.companyId = this.companyInfo.companyId;
            this.selectedAgreement.dumperPartnerInfo.companyName = this.companyInfo.companyName;
            this.selectedAgreement.dumperPartnerInfo.companyZipCode = this.companyInfo.companyZipCode;
            this.selectedAgreement.dumperPartnerInfo.companyZipCodeFormated = this.utilService.prepareZipCodeFormate(this.companyInfo.companyZipCode);
            this.selectedAgreement.dumperPartnerInfo.companyAddress = this.companyInfo.companyAddress;
            this.selectedAgreement.dumperPartnerInfo.contactNo = this.companyInfo.contactNo;
            this.selectedAgreement.dumperPartnerInfo.contactNoFormated = this.utilService.prepareContactNoFormate(this.companyInfo.contactNo);
            this.selectedAgreement.dumperPartnerInfo.accountantInfo = this.companyInfo.accountantInfo;
            this.selectedAgreement.dumperPartnerInfo.companyId = this.companyInfo.companyId;
            this.selectedAgreement.dumperPartnerInfo.companyId = this.companyInfo.companyId;
            this.selectedAgreement.dumperPartnerInfo.companyBusinessCategory = this.companyInfo.companyBusinessCategory;

            if (this.companyInfo.companyBusinessCategory) {
                this.selectedAgreement.dumperPartnerInfo.companyRoleSelection = this.businessAgreementService.prepareCompanyBusinessCategorySelectionModel(this.companyInfo.companyBusinessCategory);

            }

            var userBasicInfo: ContextUserBasicInfo = this.languageService.getCurrentUserBasicInfo(this.companyInfo.companyId);
            this.selectedAgreement.dumperPartnerInfo.personInChargeId = userBasicInfo.userInfoId;
            this.selectedAgreement.dumperPartnerInfo.personInChargeName = userBasicInfo.userName;
            this.selectedAgreement.dumperPartnerInfo.personInchargeEmail = this.utilService.getUserIdCookie();

            if (this.selectedAgreement.dumperPartnerInfo) {
                this.selectedAgreement.dumperPartnerInfo.companyCategorySelection = JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory));

                this.selectedAgreement.dumperPartnerInfo.companyRoleSelection = [false, false, false];


                var companyCategorys: string = JSON.stringify(this.selectedAgreement.dumperPartnerInfo.companyBusinessCategory);

                this.selectedAgreement.dumperPartnerInfo.companyCategorySelection.forEach((eachCategory, index) => {
                    if (this.selectedAgreement.dumperPartnerInfo.assignedRoles && eachCategory.title == this.selectedAgreement.dumperPartnerInfo.assignedRoles) {
                        this.selectedAgreement.dumperPartnerInfo.companyRoleSelection[index] = true;
                        this.selectedAgreement.dumperPartnerInfo.companyCategorySelection[index].isSelected = true;
                        this.selectedAgreement.dumperPartnerInfo.roleIndex = -1;

                    }

                    if (!companyCategorys.includes(eachCategory.title)) {
                        this.selectedAgreement.dumperPartnerInfo.companyCategorySelection[index].isDisable = false;
                    }
                });
            }

            this.selectedAgreement.partnerList.forEach(eachPartner => {
                eachPartner.contactNoFormated = this.utilService.prepareContactNoFormate(eachPartner.contactNo);
                eachPartner.companyZipCodeFormated = this.utilService.prepareZipCodeFormate(eachPartner.companyZipCode);
            })




            // this.selectedAgreement.dumperPartnerInfo.assignedRoles = AppConstant.CATEGORY_NAME_DUMPER;
        }



    }

    prepareFilterItems(agreementProcessDef: any[]) {
        this.filterItems = this.businessAgreementService.filterItems(agreementProcessDef);
        this.selectedOperationFilter = this.filterItems[0];

        // var agreementStatusString: string = "";
        // this.filterItems.forEach(element => {
        //     element.statusList.forEach(status => {
        //         agreementStatusString = agreementStatusString + status.statusId + '|';
        //     });

        // });
    }

    onTabChange($event: any) {
        this.selectedIndex = $event.index;
        this.isViewMode = false;
        // if ($event.index == 1) {
        //     this.getCompanyInfo(this.companyInfo.companyId);
        // }
    }

    selectedIndex = 0;
    editAgreement = (selectedAgreement?: AgreementInfo, selectedProcess?: any): void => {

        if (selectedAgreement) {
            this.selectedAgreement = selectedAgreement;

            // this.prepareDumperPartnerInfo();
        } else {
            this.selectedAgreement = Object.assign({}, this.agreementInfo);
            this.selectedAgreement.agreementWasteTransportInfo = [];
            this.selectedAgreement.agreementWasteProcessInfo = [];
            // this.prepareDumperPartnerInfo();
        }

        this.businessAgreementService.initPartnerBankAccountInfo(this.selectedAgreement.partnerList);

        this.checkAgreementTitleValidity(this.selectedAgreement.title, this.selectedAgreement.agreementId);

        if (selectedProcess) {
            this.selectedProcess = selectedProcess;
            this.isViewMode = selectedProcess.viewMode;
        } else {
            // this.selectedProcess = this.agreementProcessDef[0];
            this.selectedProcess = this.businessAgreementService.prepareProcessDefForView(this.agreementProcessDef[0], this.companyInfo.companyId);
            this.isViewMode = false;
        }

        if (this.selectedProcess.isApprovalRequired) {
            this.selectedIndex = 2;
            this.isAgreementListView = false;
            this.isCreateAgreementView = true;
        } else {
            this.processActionAndUpdateStatus();
        }

    }
    saveNotification(agreementId: string) {

        this.notificationSetInfo.baseTableId = agreementId;
        this.notificationSetInfo.contextId = AppConstant.AGREEMENT_NOTIFICAIONT_ID;
        this.notificationSetInfo.companyId = this.utilService.getCompanyIdCookie();
        this.notificationSetInfo.trigerUserInfoId = this.utilService.getUserIdCookie();
        this.businessAgreementService.sendNotification(this.notificationSetInfo).subscribe(data => {

        })
    }

    processActionAndUpdateStatus() {

        this.businessAgreementService.actionConfirmAndSave(this.selectedProcess.processAction[0], this.selectedAgreement.agreementStatus.statusTitle, this.agreementProcessDef);

        this.businessAgreementService.updateAgreementStatus(this.selectedAgreement, this.selectedProcess.processAction[0], this.companyInfo.companyId, (agreementStatusUpdate: AgreementStatusUpdate) => {
            this.utilService.showSnackbar('Agreement Status Updated', 3000);
            this.notificationSetInfo.status = this.businessAgreementService.getNotificationStatusInfo(agreementStatusUpdate.statusId, this.agreementProcessDef)
            this.saveNotification(agreementStatusUpdate.agreementId)
            this.businessAgreementService.prepareAgreementAfterStatusUpdate(agreementStatusUpdate, this.selectedAgreement, this.agreementProcessDef, this.companyInfo.companyId, (preparedAgreement: AgreementInfo) => {
                this.selectedAgreement = preparedAgreement;

                this.selectedOperationFilter = this.businessAgreementService.updateAgreementFilter(preparedAgreement.agreementStatus.statusId, this.filterItems);
            });
        });
    }

    changeTab = (): void => {
        // this.selectedIndex = index;

        this.getAgreementList(this.selectedCompanyId, AppConstant.INITIAL_PAGE_NO, AppConstant.INITIAL_SEARCH_TEXT, AppConstant.AGREEMENT_INITIALLY_SELECTED_STATUS, true, () => {

        });

        this.isAgreementListView = true;
        this.isCreateAgreementView = false;

    }



}