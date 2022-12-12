import { Component, Inject, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { UserInfoFetch } from 'src/app/models/backend-fetch/user-management-fetch';
import { AgreementInfo, PartnerInfo, AgreementWasteTransportInfo, AgreementPartnerInfo, AgreementStatusUpdate, OwnApprovalStatus, AgreementFilter } from 'src/app/models/backend-fetch/business-agreement';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { SelectPersonInChargePopupComponent } from '../select-person-in-charge-popup/select-person-in-charge-popup.component';
import { SelectAgreementPartnerPopupComponent } from '../select-agreement-partner-popup/select-agreement-partner-popup.component';
import { SelectWastePopupComponent } from '../select-waste-popup/select-waste-popup.component';
import { SelectBankPopupComponent } from '../select-bank-popup/select-bank-popup.component';
import { BusinessAgreementService } from 'src/app/services/operation-services/dumper-admin/business-agreement.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { UriService } from 'src/app/services/visitor-services/uri.service';
import { AccountantInfo } from 'src/app/models/backend-fetch/company-settings-fetch';
import { AppConstant } from 'src/app/config/app-constant';
import { BankAccountInfoPopupComponent } from 'src/app/company-admin/company-settings/bank-account-info-popup/bank-account-info-popup.component';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { ContextUserBasicInfo } from 'src/app/models/backend-fetch/dxr-system';


@Component({
    selector: 'app-agreement-tab',
    templateUrl: './agreement-tab.component.html',
    styleUrls: ['./agreement-tab.component.css']
})
export class AgreementTabComponent implements OnInit {

    @Input()
    tabIndex!: number;

    @Input()
    changeTab!: () => void;

    @Input()
    agreementProcessDef!: any[];

    @Input()
    selectedProcess?: any;

    @Input()
    companyInfo!: PartnerInfo;

    @Input()
    agreementList!: AgreementInfo[];

    @Input()
    selectedAgreement!: AgreementInfo;

    @Input()
    isViewMode!: boolean;

    @Input()
    selectedOperationFilter!: AgreementFilter;

    @Input()
    filterItems!: AgreementFilter[];

    @Input()
    creatorRoleIndex: number = -1;

    @Input()
    firstPartyRoleIndex: number = -1;

    @Input()
    secondPartyRoleIndex: number = -1;

    @Input()
    isValidAgreementTitle: boolean = false;

    constructor(private breakpointObserver: BreakpointObserver, private matDialog: MatDialog, private languageService: LanguageService, private businessAgreementService: BusinessAgreementService, private uriService: UriService, private utilService: UtilService, @Inject(MAT_DIALOG_DATA) public data?: any) { }

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
            companyCategorySelection: JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory)))),
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

    uiLabels: any = {
        headerLabel: "Agreement Basic Information",
        saveButton: "Save",
        agreementTitle: "Agreement Title",
        agreementDate: "Agreement Date",
        agreementValidDate: "Agreement Valid Date",
        dumperCompanyInfoSectionHeader: "Creating Company",
        companyName: "Company Name",
        companyZipCode: "Zip Code 〒",
        companyAddress: "Address",
        companyContactNo: "Contact No",
        companyPersonInCharge: "Person in Charge",
        selectPersonInChargeButton: "Select Person in Charge",
        businessPartnerSettingSectionHeader: "Business Partner Setting",
        selectPartnerButton: "Select Partner",
        assignedRole: "Role",
        transporterRole: "Transporter",
        processorRole: "Processor",
        agreementPriceSettingSectionHeader: "Agreement Price Setting",
        transportPriceSettingSectionHeader: "Transport Price Setting",
        transportPriceHeader: "Transport Price",
        addNewWasteButton: "Add New Waste",
        wasteTitle: "Waste Title",
        wasteType: "Waste Type",
        selectWasteButton: "Select Waste",
        wasteCollectLocation: "Collection Location : 〒",
        wasteDropLocation: "Drop Location : 〒",
        selectLocation: "Select Location",
        transportPrice: "Price",
        saveWasteCollection: "Add",
        wasteCollectionList: "Transport Price List",
        processingPriceSectionHeader: "Processing Price List",
        wasteUnit: "Unit",
        paymentMethodSettingSectionHeader: "Payment Method Setting",
        paymentReceivingCompanyList: "Payment Receiving Company List",
        savedBankAccountInfo: "Saved Bank Account Info",
        otherBankAccountInfo: "Other Bank Account Info",
        selectBankAccount: "Select Account",
        bankName: "Bank Name",
        branchName: "Branch Name",
        accountNo: "Account No",
        accountName: "Account Name",
        invoiceInfo: "Invoice Info",
        accountantName: "Accountant Name",
        accountantEmail: "Accountant Email",
        invoiceClosingDate: "Ivoice Closing Date",
        invoicePaymentDate: "Invoice Payment Date",
        paymentMethod: "Payment Method",
        agreementRemark: "Remark",
        status: "Status"
    }

    agreementWasteTransportInfo: AgreementWasteTransportInfo = {} as AgreementWasteTransportInfo;

    agreementWasteTransportInfoList: AgreementWasteTransportInfo[] = [];

    useSavedAccount = AppConstant.USE_SAVED_BANK_ACCOUNT;
    useOtherAccount = AppConstant.USE_OTHER_BANK_ACCOUNT;

    roleTransporter = AppConstant.CATEGORY_NAME_TRANSPORTER;
    roleProcessor = AppConstant.CATEGORY_NAME_PROCESSOR;

    dumperCompanyId = '';
    transporterCompanyId = '';
    processorCompanyId = '';

    viewContent = false;
    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.AGREEMENT_TAB, AppConstant.UI_LABEL_TEXT);

        if (this.data && this.data.isViewMode) {
            this.isViewMode = this.data.isViewMode;
            this.companyInfo = this.data.companyInfo;
            this.selectedAgreement = this.data.selectedAgreement;
            this.viewContent = true;
            // this.prepareDumperPartnerInfo(this.companyInfo);

        } else {
            if (!this.selectedAgreement || !this.selectedAgreement.agreementId) {
                this.selectedAgreement = Object.assign({}, this.agreementInfo);
            }

            this.prepareDumperPartnerInfo(this.companyInfo);
        }

        if (!this.selectedAgreement.agreementId) {
            this.selectedAgreement.agreementId = this.utilService.generateUniqueId();
        }

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.AGREEMENT_TAB;
        this.validAgreementTitle(this.selectedAgreement.title, this.selectedAgreement.agreementId);

    }

    prepareDumperPartnerInfo(companyInfo: PartnerInfo) {

        this.selectedAgreement.dumperPartnerInfo.companyId = companyInfo.companyId;
        this.selectedAgreement.dumperPartnerInfo.companyName = companyInfo.companyName;
        this.selectedAgreement.dumperPartnerInfo.companyZipCode = companyInfo.companyZipCode;
        this.selectedAgreement.dumperPartnerInfo.companyZipCodeFormated = this.utilService.prepareZipCodeFormate(companyInfo.companyZipCode);
        this.selectedAgreement.dumperPartnerInfo.companyAddress = companyInfo.companyAddress;
        this.selectedAgreement.dumperPartnerInfo.contactNo = companyInfo.contactNo;
        this.selectedAgreement.dumperPartnerInfo.contactNoFormated = this.utilService.prepareContactNoFormate(companyInfo.contactNo);
        this.selectedAgreement.dumperPartnerInfo.accountantInfo = companyInfo.accountantInfo;
        this.selectedAgreement.dumperPartnerInfo.companyBusinessCategory = companyInfo.companyBusinessCategory;

        if (companyInfo.companyBusinessCategory) {
            this.selectedAgreement.dumperPartnerInfo.companyRoleSelection = this.businessAgreementService.prepareCompanyBusinessCategorySelectionModel(companyInfo.companyBusinessCategory);
        }

        var userBasicInfo: ContextUserBasicInfo = this.languageService.getCurrentUserBasicInfo(this.companyInfo.companyId);
        this.selectedAgreement.dumperPartnerInfo.personInChargeId = userBasicInfo.userInfoId;
        this.selectedAgreement.dumperPartnerInfo.personInChargeName = userBasicInfo.userName;
        this.selectedAgreement.dumperPartnerInfo.personInchargeEmail = this.utilService.getUserIdCookie();

        // if (this.selectedAgreement.dumperPartnerInfo) {
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
        // }

        this.selectedAgreement.dumperPartnerInfo.accountInfo.companyId = companyInfo.companyId;
        this.selectedAgreement.dumperPartnerInfo.accountType = AppConstant.USE_SAVED_BANK_ACCOUNT;
        this.selectedAgreement.dumperPartnerInfo.otherBankAccountInfo.companyId = companyInfo.companyId;

        this.selectedAgreement.dumperPartnerInfo.bankAcComponentData = this.businessAgreementService.prepareBankAccountComponentData(this.selectedAgreement.dumperPartnerInfo);

        this.viewContent = true;

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    openSelectPersonInChargePopup(agreementPartnerInfo: AgreementPartnerInfo) {
        const selectPersonInChargePopup = this.matDialog.open(SelectPersonInChargePopupComponent, {
            width: '75%',
            height: '75%',
            data: agreementPartnerInfo
        });

        selectPersonInChargePopup.afterClosed().subscribe((data: UserInfoFetch) => {

            if (data) {
                agreementPartnerInfo.personInChargeId = data.userInfoId;
                agreementPartnerInfo.personInChargeName = data.userName;
            }
        });
    }

    openSelectPartnerPopup(event: any, partnerList: AgreementPartnerInfo[], partnerPanel: any) {

        this.utilService.stopEventPropagation(event)

        var comCategoryFilterItem: string[] = JSON.parse(JSON.stringify(AppConstant.AGREEMENT_COMPANY_CATEGORY_IDS));
        if (this.selectedAgreement.dumperPartnerInfo.companyCategorySelection) {
            this.selectedAgreement.dumperPartnerInfo.companyCategorySelection.forEach((each, index) => {
                if (each.isSelected) {
                    comCategoryFilterItem.splice(index, 1);
                }
            })
        }

        var comCategoryFilterString: string = comCategoryFilterItem.join("|");

        const selectPartnerPopup = this.matDialog.open(SelectAgreementPartnerPopupComponent, {
            width: '75%',
            height: '75%',
            data: {
                partnerList: partnerList,
                comCategoryFilterString: comCategoryFilterString
            }
        });

        selectPartnerPopup.afterClosed().subscribe(data => {
            if (data) {
                // this.selectedAgreement.partnerList = data;
                // this.myPanels.openAll();
                this.preparePartnersAccountantInfo(data, (partnerList: AgreementPartnerInfo[]) => {

                    this.businessAgreementService.initPartnerBankAccountInfo(partnerList);
                    this.selectedAgreement.partnerList = partnerList;
                    partnerPanel.open();

                });
            }

        });
    }

    preparePartnersAccountantInfo(partnerList: AgreementPartnerInfo[], callBack: any) {

        if (partnerList) {
            var callBackCount = 0;
            partnerList.forEach((element, index) => {
                this.businessAgreementService.getCompanyAccountantInfo(element.companyId).subscribe(accountantInfo => {
                    if (accountantInfo) {

                        if (accountantInfo && accountantInfo.companyId) {
                            let itemIndex = partnerList.findIndex(item => item.companyId == accountantInfo.companyId);

                            if (itemIndex >= 0) {
                                partnerList[itemIndex].accountantInfo = accountantInfo;
                            }
                        }
                        // this.addAccountantInfoToPartner(data);
                    }

                    callBackCount++;

                    if (callBackCount == partnerList.length) {
                        callBack(partnerList);
                    }
                });
            });
        }

    }

    addAccountantInfoToPartner(accountantInfo: AccountantInfo) {
        if (accountantInfo && accountantInfo.companyId) {
            let itemIndex = this.selectedAgreement.partnerList.findIndex(item => item.companyId == accountantInfo.companyId);

            if (itemIndex >= 0) {
                this.selectedAgreement.partnerList[itemIndex].accountantInfo = accountantInfo;
            }
        }
    }

    openSelectWastePopup(transportPricePanel: any) {
        const selectWastePopup = this.matDialog.open(SelectWastePopupComponent, {
            width: '75%',
            height: '75%',
            // data: this.selectedAgreement.agreementWasteTransportInfo
        });

        selectWastePopup.afterClosed().subscribe(data => {
            if (data) {
                this.updateAgreementTransportAndProcessingWaste(data);
            }
            transportPricePanel.open()
        });
    }

    updateAgreementTransportAndProcessingWaste(newTransportWasteItems: AgreementWasteTransportInfo[]) {
        this.selectedAgreement.agreementWasteTransportInfo = this.selectedAgreement.agreementWasteTransportInfo.concat(newTransportWasteItems);
        this.selectedAgreement.agreementWasteProcessInfo = this.businessAgreementService.prepareWateProcessingInfoList(newTransportWasteItems, this.selectedAgreement.agreementWasteProcessInfo);
        this.selectedAgreement.agreementInvoiceWasteList = this.businessAgreementService.prepareInvoiceWasteInfoList(this.selectedAgreement);
    }

    prepareInvoiceWasteInfoList(selectedAgreement: AgreementInfo) {
        this.selectedAgreement.agreementInvoiceWasteList = this.businessAgreementService.prepareInvoiceWasteInfoList(selectedAgreement);
    }

    removeAgreementTransportAndProcessingWaste(newlySelectedWasteList: AgreementWasteTransportInfo) {
        if (this.selectedAgreement.agreementWasteTransportInfo) {
            var removeIndex: number = -1;
            removeIndex = this.selectedAgreement.agreementWasteTransportInfo.findIndex(item => item.agreementWasteTransportInfoId == newlySelectedWasteList.agreementWasteTransportInfoId);

            if (removeIndex >= 0) {
                this.selectedAgreement.agreementWasteTransportInfo.splice(removeIndex, 1);
            }
        }

        let wasteItemExistInTransportList = this.selectedAgreement.agreementWasteTransportInfo.find(item => item.wasteDefId == newlySelectedWasteList.wasteDefId);

        if (!wasteItemExistInTransportList) {
            let itemIndex = this.selectedAgreement.agreementWasteProcessInfo.findIndex(item => item.wasteDefId == newlySelectedWasteList.wasteDefId);

            if (itemIndex >= 0) {
                this.selectedAgreement.agreementWasteProcessInfo.splice(itemIndex, 1);
            }
        }
    }

    openSelectBankAccountPopup(selectedPartner: AgreementPartnerInfo) {

        var popupData = this.businessAgreementService.prepareBankAccountComponentData(selectedPartner);

        const selectBankAccountPopup = this.matDialog.open(SelectBankPopupComponent, {
            width: '75%',
            height: '75%',
            data: popupData
        });

        selectBankAccountPopup.afterClosed().subscribe(data => {
            if (data) {
                if (data.otherBankAccount) {
                    selectedPartner.otherBankAccountInfo = data.bankAccountInfo;
                    selectedPartner.accountType = this.useOtherAccount;
                } else {
                    selectedPartner.accountInfo = data.bankAccountInfo;
                    selectedPartner.accountType = this.useSavedAccount;
                }
            }
        });
    }

    openAddBankAccountPopup(selectedPartner: AgreementPartnerInfo) {
        const addOtherBankAccountInfoPopup = this.matDialog.open(BankAccountInfoPopupComponent, {
            width: '75%',
            height: '75%',
            data: {
                bankAccount: null,
                companyId: selectedPartner.companyId
            }
        });

        addOtherBankAccountInfoPopup.afterClosed().subscribe(data => {
            if (data) {
                selectedPartner.otherBankAccountInfo = data;
            }
        });
    }

    setPickAddressFromZipCodeData(zipCode: string) {
        if (zipCode) {

            this.uriService.getZipCodeInformation(zipCode).subscribe((data) => {
                if (data) {
                    this.agreementWasteTransportInfo.pickAddress = data.address;
                }

            });
        }

    }

    setDropAddressFromZipCodeData(zipCode: string) {
        if (zipCode) {

            this.uriService.getZipCodeInformation(zipCode).subscribe((data) => {
                if (data) {
                    this.agreementWasteTransportInfo.dropAddress = data.address;
                }

            });
        }

    }

    prepareAgreementData(agreementInfo: AgreementInfo): AgreementInfo {
        var preparedAgreementInfo: AgreementInfo = {} as AgreementInfo;
        preparedAgreementInfo.title = Object.assign('', agreementInfo.title);
        var partnerInfo: AgreementPartnerInfo[] = [];

        if (agreementInfo) {
            var roleFlag = 1;
            if (agreementInfo.dumperPartnerInfo.companyCategorySelection) {

                agreementInfo.dumperPartnerInfo.companyCategorySelection.forEach((eachRole, index) => {
                    if (agreementInfo.dumperPartnerInfo.companyCategorySelection[index].isSelected) {
                        if (roleFlag == 1) {
                            preparedAgreementInfo.dumperPartnerInfo = Object.assign({}, agreementInfo.dumperPartnerInfo);
                            preparedAgreementInfo.dumperPartnerInfo.assignedRoles = eachRole.title;
                        }

                        if (roleFlag == 2) {
                            preparedAgreementInfo.transporterPartnerInfo = Object.assign({}, agreementInfo.dumperPartnerInfo);
                            preparedAgreementInfo.transporterPartnerInfo.assignedRoles = eachRole.title;
                        }

                        if (roleFlag == 3) {
                            preparedAgreementInfo.processorPartnerInfo = Object.assign({}, agreementInfo.dumperPartnerInfo);
                            preparedAgreementInfo.processorPartnerInfo.assignedRoles = eachRole.title;
                        }

                        roleFlag++;

                    }
                });
            }

            if (agreementInfo.partnerList) {
                agreementInfo.partnerList.forEach(eachPartner => {
                    if (eachPartner.companyCategorySelection) {

                        for (let index = 0; index < eachPartner.companyCategorySelection.length; index++) {

                            var eachRole = eachPartner.companyCategorySelection[index].title;

                            if (eachPartner.companyCategorySelection[index].isSelected) {

                                if (roleFlag == 2) {
                                    preparedAgreementInfo.transporterPartnerInfo = Object.assign({}, eachPartner);
                                    preparedAgreementInfo.transporterPartnerInfo.assignedRoles = eachRole;
                                }

                                if (roleFlag == 3) {
                                    preparedAgreementInfo.processorPartnerInfo = Object.assign({}, eachPartner);
                                    preparedAgreementInfo.processorPartnerInfo.assignedRoles = eachRole;
                                }

                                roleFlag++


                            }
                        }

                    }
                });
            }

            this.selectedAgreement.agreementInvoiceWasteList = this.businessAgreementService.prepareInvoiceWasteInfoList(this.selectedAgreement);

        } else {
            preparedAgreementInfo = {} as AgreementInfo;
        }

        return preparedAgreementInfo;
    }

    validAgreementTitle(agreementTitle: string, agreementId: string) {

        var companyId: string = this.utilService.getCompanyIdCookie();
        if (agreementTitle) {
            this.businessAgreementService.validAgreementTitle(agreementId, agreementTitle, companyId).subscribe(backendResponse => {

                if (backendResponse && backendResponse.duplicateId) {
                    this.isValidAgreementTitle = false;
                }
                else {
                    this.isValidAgreementTitle = true;
                }
            });
        }
    }

    saveAgreement(processAction: any) {

        if (this.isValidAgreementTitle) {
            var agreementInfoForSave = {} as AgreementInfo;
            if (this.selectedAgreement && this.selectedProcess) {
                if (!this.selectedProcess.viewMode) {
                    // if (!this.selectedAgreement.agreementId) {
                    //     this.selectedAgreement.agreementId = this.utilService.generateUniqueId();
                    // }
                    var preparedAgreementInfo: AgreementInfo = this.prepareAgreementData(this.selectedAgreement);
                    debugger
                    if (preparedAgreementInfo && preparedAgreementInfo.title && this.selectedAgreement.agreementWasteTransportInfo && this.selectedAgreement.agreementWasteTransportInfo.length > 0 && this.selectedAgreement.agreementInvoiceWasteList && this.selectedAgreement.agreementInvoiceWasteList.length > 0) {

                        agreementInfoForSave = Object.assign({}, this.selectedAgreement);
                        agreementInfoForSave.dumperPartnerInfo = Object.assign({}, preparedAgreementInfo.dumperPartnerInfo);
                        agreementInfoForSave.transporterPartnerInfo = Object.assign({}, preparedAgreementInfo.transporterPartnerInfo);
                        agreementInfoForSave.processorPartnerInfo = Object.assign({}, preparedAgreementInfo.processorPartnerInfo);

                        var validationReport = this.businessAgreementService.agreementFormValidator(agreementInfoForSave);
                        if (validationReport && validationReport.invalidCount > 0) {
                            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                                width: '700px',
                                data: validationReport,
                            });
                        } else {

                            if (!agreementInfoForSave.agreementId) {
                                agreementInfoForSave.agreementId = this.utilService.generateUniqueId();
                            }

                            this.businessAgreementService.updateAgreementStatus(agreementInfoForSave, processAction, this.companyInfo.companyId, (agreementStatusUpdate: AgreementStatusUpdate) => {

                                agreementInfoForSave.agreementStatus = {
                                    statusId: agreementStatusUpdate.statusId,
                                    statusTitle: ""
                                };

                                this.businessAgreementService.saveAgreementInfo(agreementInfoForSave).subscribe(data => {
                                    if (data && data.agreementId) {

                                        // this.updateAgreementStatus(data, processAction, () => {
                                        this.utilService.showSnackbar(this.uiLabels.responseSavedToast, 3000);

                                        var ownApprovalStatus: OwnApprovalStatus = {
                                            agreementId: data.agreementId,
                                            companyId: this.companyInfo.companyId,
                                            isApproved: false
                                        }

                                        this.businessAgreementService.getOwnApprovalStatus(ownApprovalStatus, (approvalStatus: OwnApprovalStatus) => {
                                            if (approvalStatus) {
                                                var savedAgreementInfoForView: AgreementInfo = this.businessAgreementService.prepareAgreementForView(data, this.agreementProcessDef, this.companyInfo.companyId, approvalStatus.isApproved);

                                                this.updateAgreementList(savedAgreementInfoForView);

                                                this.resetForm();


                                                // this.selectedProcess = this.businessAgreementService.prepareProcessDefForView(this.agreementProcessDef[0], this.companyInfo.companyId);

                                                this.tabIndex = 1;
                                            }

                                        });

                                        // });

                                    } else {
                                        this.utilService.showSnackbar(this.uiLabels.invalidDataToast, 3000);
                                    }

                                });
                            });

                        }

                    } else {
                        if (!preparedAgreementInfo || !preparedAgreementInfo.title) {
                            this.utilService.showSnackbar(this.uiLabels.invalidDataToast, 3000);

                        } else if (!preparedAgreementInfo.agreementInvoiceWasteList || preparedAgreementInfo.agreementInvoiceWasteList.length <= 0) {
                            this.selectedAgreement.invoiceReceiverComId = "";
                            this.utilService.showSnackbar(this.uiLabels.invalidInvoicePolicyToast, 3000);

                        }

                    }

                } else {

                    this.businessAgreementService.updateAgreementStatus(this.selectedAgreement, processAction, this.companyInfo.companyId, (agreementStatusUpdate: AgreementStatusUpdate) => {
                        this.utilService.showSnackbar(this.uiLabels.responseSavedToast, 3000);
                        this.businessAgreementService.prepareAgreementAfterStatusUpdate(agreementStatusUpdate, this.selectedAgreement, this.agreementProcessDef, this.companyInfo.companyId, (preparedAgreement: AgreementInfo) => {
                            this.selectedAgreement = preparedAgreement;

                        });
                    });

                }

            } else {
                this.utilService.showSnackbar(this.uiLabels.invalidMessage, 3000);
            }
        }
    }

    updateAgreementList(agreementItem: AgreementInfo) {
        let itemIndex = this.agreementList.findIndex(item => item.agreementId == agreementItem.agreementId);
        if (itemIndex >= 0) {
            this.agreementList[itemIndex] = agreementItem;
        } else {
            this.agreementList.unshift(agreementItem);
        }
    }

    // switchToAgreementList() {
    //     this.tabIndex = 1;
    // }

    resetForm() {
        this.selectedAgreement = Object.assign({}, this.agreementInfo);
        this.selectedAgreement.agreementWasteTransportInfo = [];
        this.selectedAgreement.agreementWasteProcessInfo = [];
        this.prepareDumperPartnerInfo(this.companyInfo);

        this.creatorRoleIndex = -1;
        this.firstPartyRoleIndex = -1;
        this.secondPartyRoleIndex = -1;
    }

    updatePartnerRoleSelection(eachCategory: any, event: any, categoryIndex: number, partner: AgreementPartnerInfo, partnerIndex: number, panel?: any, checkCreator?: boolean) {

        this.utilService.stopEventPropagation(event);

        if (this.isViewMode) {
            return;
        }

        if (checkCreator && this.partnerRoleSelection(eachCategory, categoryIndex, partnerIndex)) {
            return;
        } else if (!checkCreator && this.creatorRoleSelection(eachCategory, categoryIndex)) {
            return
        }

        eachCategory.isSelected = (eachCategory.isSelected) ? false : true;

        if (eachCategory.isSelected) {
            partner.assignedRoles = eachCategory.title;
            this.selectedAgreement.agreementInvoiceWasteList = this.businessAgreementService.prepareInvoiceWasteInfoList(this.selectedAgreement);

        } else {
            partner.assignedRoles = "";
        }

        partner.companyCategorySelection.forEach((each, index) => {
            if (categoryIndex != index) {
                each.isSelected = false;

            }
        })

    }


    creatorRoleSelection(eachCategory: any, creatorCategoryIndex: number) {
        return (!eachCategory.isDisable || (this.selectedAgreement.partnerList[0] && this.selectedAgreement.partnerList[0].companyCategorySelection[creatorCategoryIndex].isSelected == true) || (this.selectedAgreement.partnerList[1] && this.selectedAgreement.partnerList[1].companyCategorySelection[creatorCategoryIndex].isSelected == true))
    }

    partnerRoleSelection(eachCategory: any, partnerCategoryIndex: number, partnerIndex: number) {
        return (!eachCategory.isDisable || (this.selectedAgreement.dumperPartnerInfo.companyCategorySelection[partnerCategoryIndex].isSelected == true) || (this.selectedAgreement.partnerList[0] && this.selectedAgreement.partnerList[0].companyCategorySelection[partnerCategoryIndex].isSelected == true && partnerIndex == 1) || (this.selectedAgreement.partnerList[1] && this.selectedAgreement.partnerList[1].companyCategorySelection[partnerCategoryIndex].isSelected == true && partnerIndex == 0))
    }

    onClickBackBtn() {
        this.changeTab();
    }

    isTransporterRole() {
        var isTransporterPartnerAvailable = false;
        if (this.selectedAgreement.dumperPartnerInfo) {
            isTransporterPartnerAvailable = this.selectedAgreement.dumperPartnerInfo.companyCategorySelection[2].isSelected;
        }

        if (!isTransporterPartnerAvailable) {
            for (let index = 0; index < this.selectedAgreement.partnerList.length; index++) {
                const eachPartner = this.selectedAgreement.partnerList[index];

                isTransporterPartnerAvailable = eachPartner.companyCategorySelection[2].isSelected;
                if (isTransporterPartnerAvailable) {
                    break;
                }
            }
        }
        return isTransporterPartnerAvailable;
    }

    isProcessorRole() {
        var isProcessorPartnerAvailable = false;
        if (this.selectedAgreement.dumperPartnerInfo) {
            isProcessorPartnerAvailable = this.selectedAgreement.dumperPartnerInfo.companyCategorySelection[1].isSelected
        }

        if (!isProcessorPartnerAvailable) {
            for (let index = 0; index < this.selectedAgreement.partnerList.length; index++) {
                const eachPartner = this.selectedAgreement.partnerList[index];

                isProcessorPartnerAvailable = eachPartner.companyCategorySelection[1].isSelected;
                if (isProcessorPartnerAvailable) {
                    break;
                }
            }
        }
        return isProcessorPartnerAvailable;
    }

    updateTransportPriceApply(event: any) {
        this.utilService.stopEventPropagation(event);

        if (this.selectedAgreement.partnerList.length == 2 || this.selectedAgreement.partnerList.length == 0 || this.isViewMode) {
            return;

        } else if (this.selectedAgreement.partnerList.length == 1) {
            var invoiceGeneratorRole: string = this.businessAgreementService.getInvoiceGeneratorCompanys(this.selectedAgreement)[0].assignedRoles;

            if (invoiceGeneratorRole == AppConstant.CATEGORY_NAME_TRANSPORTER) {
                if (!this.selectedAgreement.isTransportPriceApply) {
                    this.selectedAgreement.isTransportPriceApply = true;
                    this.selectedAgreement.agreementInvoiceWasteList = this.businessAgreementService.prepareInvoiceWasteInfoList(this.selectedAgreement);
                }
                return;
            }
        }

        this.selectedAgreement.isTransportPriceApply = (this.selectedAgreement.isTransportPriceApply) ? false : true;
        this.selectedAgreement.agreementInvoiceWasteList = this.businessAgreementService.prepareInvoiceWasteInfoList(this.selectedAgreement);
    }

    updateProcessingPriceApply(event: any) {
        this.utilService.stopEventPropagation(event);

        if (this.selectedAgreement.partnerList.length == 2 || this.selectedAgreement.partnerList.length == 0 || this.isViewMode) {
            return;

        } else if (this.selectedAgreement.partnerList.length == 1) {

            var invoiceGeneratorRole: string = this.businessAgreementService.getInvoiceGeneratorCompanys(this.selectedAgreement)[0].assignedRoles;

            if (invoiceGeneratorRole == AppConstant.CATEGORY_NAME_PROCESSOR) {
                if (!this.selectedAgreement.isProcessingPriceApply) {
                    this.selectedAgreement.isProcessingPriceApply = true;
                    this.selectedAgreement.agreementInvoiceWasteList = this.businessAgreementService.prepareInvoiceWasteInfoList(this.selectedAgreement);
                }
                return;
            }
        }

        this.selectedAgreement.isProcessingPriceApply = (this.selectedAgreement.isProcessingPriceApply) ? false : true;
        this.selectedAgreement.agreementInvoiceWasteList = this.businessAgreementService.prepareInvoiceWasteInfoList(this.selectedAgreement);
    }

    get getPartners() {
        var partners: AgreementPartnerInfo[] = [];
        partners.unshift(this.selectedAgreement.dumperPartnerInfo);
        return partners.concat(this.selectedAgreement.partnerList)
    }

    selectInvoiceReceiver(partnerCompanyId: string) {
        if (this.isViewMode) {
            return;
        }

        this.selectedAgreement.invoiceReceiverComId = partnerCompanyId;

        this.selectedAgreement.agreementInvoiceWasteList = this.businessAgreementService.prepareInvoiceWasteInfoList(this.selectedAgreement);
    }


    get sortedTransportWaste() {
        return this.selectedAgreement.agreementWasteTransportInfo.sort((a, b) => a.wasteTitle.localeCompare(b.wasteTitle));
    }

    get sortedProcessWaste() {
        return this.selectedAgreement.agreementWasteProcessInfo.sort((a, b) => a.wasteTitle.localeCompare(b.wasteTitle));
    }

    get sortedInvoiceWaste() {
        return this.selectedAgreement.agreementInvoiceWasteList.sort((a, b) => a.wasteTitle.localeCompare(b.wasteTitle));
    }

    updatePaymentMethodSelection(partner: AgreementPartnerInfo, modeId: string) {
        if (modeId == '0') {
            partner.bankPayment = true;
        } else {
            partner.bankPayment = false;
        }
    }
}
