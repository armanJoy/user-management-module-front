import { AccountantInfo, BankAccountInfo, BranchInfoFetch, CompWasteInfoFetch } from "./company-settings-fetch";


export interface CompanyCategorySelection {
    categoryId: string,
    title: string,
    isSelected: boolean | false,
    isDisable: boolean | false
}

export interface CompanyPaymentMethodSelection {
    methodId: string;
    title: string;
    isSelected: boolean | false;
}

export interface ActionConfirmPopupDate {
    currentStatus: string;
    newStatus: string;
    isApprovedByOtherParty: boolean;
}

export interface OwnApprovalStatus {
    agreementId: string;
    companyId: string;
    isApproved: boolean;
}

export interface AgreementStatusUpdate {
    agreementId: string;
    statusId: string;
    isApprovalRequired: boolean;
    requestedCompanyId: string;
    requestedCompanyType: string;
    isApproved: boolean;
}

export interface AgreementInfo {
    agreementId: string | '';
    title: string | '';
    createDate: string | '';
    createDateView: string | '';
    validDate: string | '';
    validDateView: string | '';
    agreementType: string | '';
    agreementStatus: AgreementStatus;

    dumperPartnerInfo: AgreementPartnerInfo;
    transporterPartnerInfo: AgreementPartnerInfo;
    processorPartnerInfo: AgreementPartnerInfo;

    agreementWasteTransportInfo: AgreementWasteTransportInfo[];
    agreementWasteProcessInfo: AgreementWasteProcessInfo[];

    partnerList: AgreementPartnerInfo[];
    agreementRemark: string | '';

    agreementProcessId: string | '';

    agreementActionId: string | '';

    processsList: any[];
    isApproveRequiredState: boolean;
    isBasicInfoFetched?: boolean | false;
    isOpen?: boolean | false;
    invoiceReceiverComId: string;
    isTransportPriceApply: boolean;
    isProcessingPriceApply: boolean;
    agreementInvoiceWasteList: AgreementInvoiceWasteInfo[];

}


export interface AgreementInfoUpdate {
    agreementId: string;
    title: string;
    createDate: string;
    createDateView: string;
    validDate: string;
    validDateView: string;
    agreementType: string;
    agreementStatus: AgreementStatus;

    dumperPartnerInfo: AgreementPartnerInfo;
    transporterPartnerInfo: AgreementPartnerInfo;
    processorPartnerInfo: AgreementPartnerInfo;

    agreementWasteTransportInfo: AgreementWasteTransportInfo[];
    agreementWasteProcessInfo: AgreementWasteProcessInfo[];

    agreementRemark: string;
}

export interface AgreementStatus {
    statusId: string;
    statusTitle: string;
}

export interface AgreementPartnerInfo {
    agreementPartnerInfoId: string;
    companyId: string;
    companyName: string;
    companyZipCode: string;
    companyZipCodeFormated: string | '';
    companyAddress: string;
    contactNo: string;
    contactNoFormated: string;
    personInChargeId: string;
    personInChargeName: string;
    personInchargeEmail: string;
    accountantInfo: AccountantInfo;
    accountInfo: BankAccountInfo;
    otherBankAccountInfo: BankAccountInfo;
    accountType: string;
    assignedRoles: string;
    companyBusinessCategory: Array<string>;
    companyRoleSelection: Array<boolean>;
    isApprovalDone: boolean;
    companyCategorySelection: CompanyCategorySelection[] | [];
    roleIndex: number | -1;
    bankAcComponentData?: any;
    approvalStatus?: string;
    paymentMethodSelection: CompanyPaymentMethodSelection[];
    bankPayment: boolean;
}

export interface AgreementBankAccountInfo {
    companyId: string;
    bankAccountId: string;
    bankName: string;
    branchName: string;
    accountNumber: string;
    accountName: string
}

export interface AgreementWasteTransportInfo {
    agreementWasteTransportInfoId: string;
    wasteDefId: string;
    wasteCategoryId: string;
    wasteTitle: string;
    wasteCategoryTitle: string;
    pickZipCode: string;
    pickAddress: string;
    pickBrachId: string;
    dropZipCode: string;
    dropAddress: string;
    dropBrachId: string;
    price: number;
    unit: string;
}

export interface AgreementWasteProcessInfo {
    agreementWasteProcessInfoId: string;
    wasteDefId: string;
    wasteCategoryId: string;
    wasteTitle: string;
    wasteCategoryTitle: string;
    price: number;
    unit: string;
    agreementId?: string;
}

export interface AgreementInvoiceWasteInfo {
    agreementInvoiceWasteInfoId: string;
    wasteDefId: string;
    wasteCategoryId: string;
    wasteTitle: string;
    wasteCategoryTitle: string;
    pickZipCode: string;
    pickAddress: string;
    dropZipCode: string;
    dropAddress: string;
    price: number;
    unit: string;
    agreementId: string;
    priceSuffix: string;
    operationType: string;
    invoiceGenerator: string;
    invoiceGeneratorName: string;
    invoiceReceiver: string;
    invoiceReceiverName: string;
    isNew?: boolean;
    bankPayment?: boolean;
}

export interface PartnerInfo {
    companyId: string;
    companyName: string;
    companyZipCode: string;
    companyZipCodeFormated: string | '';
    companyAddress: string;
    representativeName: string;
    representativEmail: string;
    contactNo: string;
    contactNoFormated: string;
    companyBusinessCategory: Array<string>;
    companyFaxNumber: string;
    notification: string;
    accountantName: string;
    accountantEmail: string;
    corporateRegNo: string;
    wasteProcessingLicenseNo: string;
    frontendDate: string;
    backendDate: string;
    branchList: BranchInfoFetch[];
    wasteList: CompWasteInfoFetch[];
    accountantInfo: AccountantInfo;
    bankAccounts: BankAccountInfo[];
}


export interface SubsctiptionInvitation {

}

export interface SubRequestPopupData {

}

export interface AgreementFilter {
    operationId: string;
    operationTitle: string;
    statusList: StatusFilter[];
}

export interface StatusFilter {
    statusId: string;
    statusTitle: string;
    isSelected: boolean;
}

export interface CompanyInvitation {
    invitationId: string;
    senderComName: string;
    senderEmail: string;
    receiverComName: string;
    receiverEmail: string;

}

export interface AgreementTransportWasteSelectionView {
    categoryId: string;
    categoryTitle: string;
    dxrWasteTypeDef: DxrWasteTypeDef[]
}

export interface DxrWasteTypeDef {
    wasteTypeId: string;
    wasteTypeTitle: string;
    dxrWasteItemDef: AgreementWasteTransportInfoSelectionView[];
    categoryId: string;

}

export interface AgreementWasteTransportInfoSelectionView {
    agreementWasteTransportInfoId: string;
    wasteDefId: string;
    wasteCategoryId: string;
    wasteTitle: string;
    wasteCategoryTitle: string;
    pickZipCode: string;
    pickAddress: string;
    pickBrachId: string;
    dropZipCode: string;
    dropAddress: string;
    dropBrachId: string;
    price: number;
    unit: string;
    isSelected: boolean | false;
}